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
          icon: (
            <div className="w-3 h-3 bg-success-600 rounded-full flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            </div>
          )
        };
      case 'borrowed':
      case 'ongoing':
        return { 
          text: `Borrowed by @${borrower}`, 
          className: 'status-badge status-borrowed',
          icon: (
            <div className="w-3 h-3 bg-danger-600 rounded-sm flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
            </div>
          )
        };
      case 'requested':
      case 'pending':
        return { 
          text: 'Pending approval', 
          className: 'status-badge status-pending',
          icon: (
            <div className="w-3 h-3 bg-warning-600 rounded-full animate-pulse"></div>
          )
        };
      case 'approved':
        return { 
          text: 'Approved', 
          className: 'status-badge status-available',
          icon: (
            <div className="w-3 h-3 bg-success-600 rounded-full flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            </div>
          )
        };
      case 'returned':
        return { 
          text: 'Returned', 
          className: 'status-badge bg-gray-100 text-gray-800 border-gray-200',
          icon: (
            <div className="w-3 h-3 bg-gray-600 rounded-sm flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
            </div>
          )
        };
      case 'rejected':
        return { 
          text: 'Rejected', 
          className: 'status-badge bg-danger-50 text-danger-700 border-danger-200',
          icon: (
            <div className="w-3 h-3 bg-danger-600 rounded-sm flex items-center justify-center">
              <div className="w-1.5 h-0.5 bg-white rounded-sm"></div>
            </div>
          )
        };
      case 'lost':
        return { 
          text: 'Lost', 
          className: 'status-badge bg-danger-100 text-danger-800 border-danger-300',
          icon: (
            <div className="w-3 h-3 bg-danger-600 rounded-sm flex items-center justify-center">
              <div className="w-1.5 h-1.5 border border-white rounded-sm"></div>
            </div>
          )
        };
      default:
        return { 
          text: 'Unknown', 
          className: 'status-badge bg-gray-100 text-gray-800 border-gray-200',
          icon: (
            <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
          )
        };
    }
  };

  const { text, className, icon } = getStatusInfo();

  return (
    <div className="flex flex-col items-end">
      <span className={`${className} flex items-center gap-2`}>
        {icon}
        {text}
      </span>
      {until && (status === 'borrowed' || status === 'ongoing') && (
        <span className="text-xs text-gray-500 mt-1 font-medium">
          Until {until}
        </span>
      )}
    </div>
  );
}
