export const organizationMock = {
  school: { id: 'school-demo-viaggio', name: 'Colegio Demo Viaggio', city: 'Santiago', status: 'Activo' },
  course: { id: 'course-8a-2028', name: '8° A', generation: '2028', studentCount: 36, guardianCount: 42 },
  trip: { id: 'trip-demo-italia-2028', name: 'Gira Italia 2028', destination: 'Roma, Florencia y Venecia', estimatedDepartureDate: '2028-10-10', status: 'Planificación' },
};

export const familiesMock = [
  { id: 'family-rossi', name: 'Familia Rossi Demo', primaryGuardian: 'Apoderado/a Demo', students: [{ id: 'student-martina', name: 'Martina Demo', status: 'Activo' }], status: 'Activa' },
  { id: 'family-bianchi', name: 'Familia Bianchi Demo', primaryGuardian: 'Apoderado/a Demo', students: [{ id: 'student-luca', name: 'Luca Demo', status: 'Pendiente de invitación' }], status: 'Pendiente' },
];
