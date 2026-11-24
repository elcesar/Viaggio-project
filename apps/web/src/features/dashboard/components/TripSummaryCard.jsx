import { MapPin, Users } from 'lucide-react';
import { Card } from '../../../shared/components/Card';
import { formatDate } from '../../../shared/utils/dates';
export function TripSummaryCard({ trip }) { return <Card className="trip-summary"><p className="card-kicker">Mi gira</p><h2>{trip.name}</h2><p>{trip.schoolName} · {trip.courseName}</p><div className="trip-summary__facts"><span><MapPin size={16} />{trip.destination}</span><span><Users size={16} />{trip.studentCount} estudiantes</span><span>Salida estimada: {formatDate(trip.estimatedDepartureDate)}</span></div></Card>; }
