import { Upload } from 'lucide-react';
import { useState } from 'react';
import { familyImportRowSchema } from '../schemas/familySchema';

function parseCsv(text) {
  const rows = text.trim().split(/\r?\n/).filter(Boolean);
  const headers = rows.shift()?.split(',').map((value) => value.trim());
  if (!headers || !['familyName', 'guardianName', 'studentName'].every((header) => headers.includes(header))) throw new Error('El CSV debe incluir: familyName, guardianName, studentName.');
  return rows.map((row) => Object.fromEntries(row.split(',').map((value, index) => [headers[index], value.trim()])));
}

function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(new Error('No fue posible leer el archivo.'));
    reader.readAsText(file);
  });
}

export function FamilyImport({ onImport }) {
  const [message, setMessage] = useState('');
  async function importFile(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const rows = parseCsv(await readFileAsText(file));
      const validRows = rows.map((row) => familyImportRowSchema.parse(row));
      onImport(validRows);
      setMessage(`${validRows.length} registro(s) validado(s) e incorporado(s) a esta maqueta.`);
    } catch (error) { setMessage(error instanceof Error ? error.message : 'No fue posible validar el archivo.'); }
  }
  return <div className="import-box"><label htmlFor="family-csv"><Upload size={18} /> Importar CSV ficticio</label><input id="family-csv" type="file" accept=".csv,text/csv" onChange={importFile} /><small>Columnas requeridas: familyName, guardianName, studentName.</small>{message && <p role="status">{message}</p>}</div>;
}
