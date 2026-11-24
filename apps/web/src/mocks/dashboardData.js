export const parentDashboardMock = {
  trip: { id: 'trip-demo-italia-2028', name: 'Gira Italia 2028', schoolName: 'Colegio Demo Viaggio', courseName: '8° A', destination: 'Roma, Florencia y Venecia', estimatedDepartureDate: '2028-10-10', studentCount: 36 },
  funding: { targetClp: 60000000, fundedClp: 43200000, percentage: 72 },
  familyAccount: { balanceClp: 1080000, nextInstallmentClp: 75000, nextDueDate: '2027-04-05', recentMovements: [{ id: 'mov-01', title: 'Cuota marzo', date: '2027-03-03', amountClp: 75000, status: 'Conciliado' }, { id: 'mov-02', title: 'Crédito por kermesse', date: '2027-03-18', amountClp: 20000, status: 'Acreditado' }] },
  events: [{ id: 'event-01', title: 'Bingo solidario', date: '2027-04-12', place: 'Gimnasio del colegio', registrationStatus: 'Inscripción abierta' }, { id: 'event-02', title: 'Reunión de apoderados', date: '2027-04-20', place: 'Sala audiovisual', registrationStatus: 'Confirmada' }],
  polls: [{ id: 'poll-01', title: 'Selección de excursión en Toscana', closesAt: '2027-04-10', participation: 68, status: 'Abierta' }],
  documents: [{ id: 'doc-01', title: 'Autorización de viaje', studentName: 'Martina Demo', dueDate: '2027-05-15', status: 'Pendiente' }, { id: 'doc-02', title: 'Copia de documento de identidad', studentName: 'Martina Demo', dueDate: '2027-05-30', status: 'En revisión' }],
  notices: [{ id: 'notice-01', title: 'Rendición de kermesse publicada', category: 'Finanzas', date: '2027-03-22', isRead: false }, { id: 'notice-02', title: 'Cambios en el calendario de abril', category: 'Calendario', date: '2027-03-20', isRead: true }],
};
