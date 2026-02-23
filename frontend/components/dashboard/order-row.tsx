'use client';

import React, { useState } from 'react';

interface OrderRowProps {
  id: string;
  recipient: string;
  location: string;
  status: string;
  amount: string;
  time: string;
}

export function OrderRow({
  id,
  recipient,
  location,
  status,
  amount,
  time,
}: OrderRowProps) {
  const [showVerifyModal, setShowVerifyModal] = React.useState(false);
  const [verificationCode, setVerificationCode] = React.useState('');
  const [isVerifying, setIsVerifying] = React.useState(false);

  const statusConfig = {
    dispatched: { color: 'bg-blue-500/20 text-blue-300 border border-blue-500/30', label: 'Dispatched', icon: '📤' },
    delivered: { color: 'bg-green-500/20 text-green-300 border border-green-500/30', label: 'Delivered', icon: '✓' },
		pending: { color: 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30', label: 'Pending', icon: '⏳' }
  };

  const borderColorClasses = {
    dispatched: 'border-l-blue-500',
    delivered: 'border-l-green-500',
		pending: 'border-l-yellow-500',
  };

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  const borderColor = borderColorClasses[status as keyof typeof borderColorClasses] || borderColorClasses.pending;

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    try {
      const response = await fetch('http://localhost:8000/api/verify/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: verificationCode }),
      });
      if (response.ok) {
        // In a real app, you would probably refetch the orders here
        setShowVerifyModal(false);
      } else {
        // Handle error
        console.error('Verification failed');
      }
    } catch (error) {
      console.error('Verification failed', error);
    }
    setIsVerifying(false);
  };

  return (
    <>
      <div className={`glass rounded-xl p-4 mb-3 border-l-4 ${borderColor} hover:bg-white/20 transition-all duration-300 group`}>
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-foreground truncate">{recipient}</h4>
            <p className="text-sm text-muted-foreground truncate">{location}</p>
          </div>

          <div className="text-right hidden sm:block">
            <p className="font-semibold text-foreground">{amount}</p>
            <p className="text-xs text-muted-foreground">{time}</p>
          </div>

          <div className="flex items-center gap-3">
            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
              {config.icon} {config.label}
            </span>

            {status === 'dispatched' && (
              <button
                onClick={() => setShowVerifyModal(true)}
                className="px-4 py-2 bg-green-500/20 text-green-300 border border-green-500/30 rounded-lg font-medium text-sm hover:shadow-lg transition-all duration-200"
              >
                Verify Code
              </button>
            )}
          </div>
        </div>
      </div>

      {showVerifyModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="glass rounded-2xl p-8 max-w-sm w-full">
            <h2 className="text-2xl font-bold text-foreground mb-6">Verify Delivery Code</h2>
            <form onSubmit={handleVerifyCode}>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Enter 6-digit code"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowVerifyModal(false)}
                  className="px-4 py-2 text-muted-foreground hover:text-foreground"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isVerifying}
                  className="px-4 py-2 gradient-trust text-white rounded-lg font-medium text-sm hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isVerifying ? 'Verifying...' : 'Verify'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
