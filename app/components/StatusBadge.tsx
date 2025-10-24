import { CheckCircle, XCircle, Clock, Check, RotateCcw, X, AlertTriangle } from 'lucide-react';
import Nickname from './Nickname';

interface StatusBadgeProps {
  status: 'available' | 'borrowed' | 'pending' | 'requested' | 'approved' | 'ongoing' | 'returned' | 'rejected' | 'lost';
  borrower?: string;
  until?: string;
}

export default function StatusBadge({ status, borrower, until }: StatusBadgeProps) {
  const getStatusInfo = () => {
    switch (status) {
      case 'available':
        return { 
          text: 'Available', 
          className: 'status-badge status-available',
          icon: <CheckCircle className="w-3 h-3 text-success-600" />
        };
      case 'borrowed':
      case 'ongoing':
        return { 
          text: `Borrowed by `, 
          borrower: borrower,
          className: 'status-badge status-borrowed',
          icon: <XCircle className="w-3 h-3 text-danger-600" />
        };
      case 'requested':
      case 'pending':
        return { 
          text: 'Pending approval', 
          className: 'status-badge status-pending',
          icon: <Clock className="w-3 h-3 text-warning-600 animate-pulse" />
        };
      case 'approved':
        return { 
          text: 'Approved', 
          className: 'status-badge status-available',
          icon: <Check className="w-3 h-3 text-success-600" />
        };
      case 'returned':
        return { 
          text: 'Returned', 
          className: 'status-badge bg-gray-100 text-gray-800 border-gray-200',
          icon: <RotateCcw className="w-3 h-3 text-gray-600" />
        };
      case 'rejected':
        return { 
          text: 'Rejected', 
          className: 'status-badge bg-danger-50 text-danger-700 border-danger-200',
          icon: <X className="w-3 h-3 text-danger-600" />
        };
      case 'lost':
        return { 
          text: 'Lost', 
          className: 'status-badge bg-danger-100 text-danger-800 border-danger-300',
          icon: <AlertTriangle className="w-3 h-3 text-danger-600" />
        };
      default:
        return { 
          text: 'Unknown', 
          className: 'status-badge bg-gray-100 text-gray-800 border-gray-200',
          icon: <AlertTriangle className="w-3 h-3 text-gray-600" />
        };
    }
  };

  const { text, className, icon, borrower: statusBorrower } = getStatusInfo();

  return (
    <div className="flex flex-col items-end">
      <span className={`${className} flex items-center gap-2`}>
        {icon}
        {text}
        {statusBorrower && <Nickname username={statusBorrower} className="text-xs" />}
      </span>
      {until && (status === 'borrowed' || status === 'ongoing') && (
        <span className="text-xs text-gray-500 mt-1 font-medium">
          Until {until}
        </span>
      )}
    </div>
  );
}
