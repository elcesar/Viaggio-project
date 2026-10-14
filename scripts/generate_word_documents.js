const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  HeadingLevel, AlignmentType, WidthType, BorderStyle, ShadingType,
  PageBreak, LevelFormat,
} = require('docx');

const root = path.resolve(__dirname, '..');
const outputDir = path.join(root, 'documentos-compartir');
fs.mkdirSync(outputDir, { recursive: true });

const navy = '073B7A';
const cyan = '35B9D4';
const muted = '5D6B7A';
const border = { style: BorderStyle.SINGLE, size: 4, color: 'D9E3EF' };
const borders = { top: border, bottom: border, left: border, right: border };
const contentWidth = 9026;

function run(text, opts = {}) {
  return new TextRun({ text, font: 'Aptos', size: opts.size || 20, color: opts.color || '182433', bold: opts.bold || false, italics: opts.italics || false });
}

function cleanInline(text) {
  return text
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1');
}

function textRuns(value) {
  const normalized = value.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1');
  const parts = normalized.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).filter(Boolean);
  return parts.map((part) => {
    if (part.startsWith('**')) return run(part.slice(2, -2), { bold: true });
    if (part.startsWith('`')) return run(part.slice(1, -1), { color: navy, bold: true });
    return run(part);
  });
}

function makeCell(value, width, header = false) {
  return new TableCell({
    width: { size: width, type: WidthType.DXA },
    borders,
    shading: header ? { fill: navy, type: ShadingType.CLEAR } : undefined,
    margins: { top: 90, bottom: 90, left: 120, right: 120 },
    children: [new Paragraph({ children: (header ? [run(cleanInline(value), { bold: true, color: 'FFFFFF' })] : textRuns(value)) })],
  });
}

function makeTable(rows) {
  const count = Math.max(...rows.map((r) => r.length));
  const widths = Array.from({ length: count }, () => Math.floor(contentWidth / count));
  widths[widths.length - 1] += contentWidth - widths.reduce((a, b) => a + b, 0);
  return new Table({
    width: { size: contentWidth, type: WidthType.DXA },
    columnWidths: widths,
    rows: rows.map((row, index) => new TableRow({
      children: widths.map((width, col) => makeCell(row[col] || '', width, index === 0)),
    })),
  });
}

function parseMarkdown(markdown) {
  const lines = markdown.split(/\r?\n/);
  const children = [];
  let index = 0;
  while (index < lines.length) {
    const line = lines[index];
    if (!line.trim()) { index += 1; continue; }
    if (line.startsWith('# ')) {
      children.push(new Paragraph({ heading: HeadingLevel.TITLE, spacing: { after: 420 }, children: [run(line.slice(2), { size: 40, bold: true, color: navy })] }));
      index += 1; continue;
    }
    if (line.startsWith('## ')) {
      children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 360, after: 170 }, children: [run(line.slice(3), { size: 30, bold: true, color: navy })] }));
      index += 1; continue;
    }
    if (line.startsWith('### ')) {
      children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 260, after: 130 }, children: [run(line.slice(4), { size: 25, bold: true, color: cyan })] }));
      index += 1; continue;
    }
    if (line.startsWith('|')) {
      const tableLines = [];
      while (index < lines.length && lines[index].startsWith('|')) tableLines.push(lines[index++]);
      const rows = tableLines
        .filter((item) => !/^\|?\s*[:-]+/.test(item.replace(/\|/g, '').trim()))
        .map((item) => item.split('|').slice(1, -1).map((cell) => cleanInline(cell.trim())));
      if (rows.length) children.push(makeTable(rows));
      continue;
    }
    const bullet = line.match(/^[-*]\s+(.+)$/);
    const number = line.match(/^\d+\.\s+(.+)$/);
    if (bullet || number) {
      children.push(new Paragraph({
        numbering: { reference: number ? 'numbers' : 'bullets', level: 0 },
        spacing: { after: 70 },
        children: textRuns(bullet ? bullet[1] : number[1]),
      }));
      index += 1; continue;
    }
    children.push(new Paragraph({ spacing: { after: 150, line: 300 }, children: textRuns(line) }));
    index += 1;
  }
  return children;
}

async function createWord(source, target) {
  const markdown = fs.readFileSync(source, 'utf8');
  const title = markdown.match(/^#\s+(.+)$/m)?.[1] || 'Documento Viaggio';
  const doc = new Document({
    creator: 'Viaggio',
    title,
    description: 'Documento de trabajo Viaggio',
    numbering: { config: [
      { reference: 'bullets', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 600, hanging: 300 } } } }] },
      { reference: 'numbers', levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 600, hanging: 300 } } } }] },
    ] },
    sections: [{
      properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1200, right: 1440, bottom: 1200, left: 1440 } } },
      headers: { default: new (require('docx').Header)({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [run('VIAGGIO', { size: 16, bold: true, color: cyan })] })] }) },
      children: [
        new Paragraph({ alignment: AlignmentType.LEFT, spacing: { after: 90 }, children: [run('DOCUMENTO DE TRABAJO', { size: 17, bold: true, color: cyan })] }),
        ...parseMarkdown(markdown),
        new Paragraph({ spacing: { before: 300 }, border: { top: { style: BorderStyle.SINGLE, size: 8, color: cyan } }, children: [run('Viaggio | Documento editable para compartir', { size: 16, color: muted })] }),
      ],
    }],
  });
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(target, buffer);
}

Promise.all([
  createWord(path.join(root, 'docs', 'ALCANCE_MVP_V1_0.md'), path.join(outputDir, 'Viaggio_Alcance_MVP_V1_0.docx')),
  createWord(path.join(root, 'docs', 'PLAN_MVP_PRODUCCION.md'), path.join(outputDir, 'Viaggio_Plan_MVP_Produccion.docx')),
]).then(() => console.log(outputDir));
