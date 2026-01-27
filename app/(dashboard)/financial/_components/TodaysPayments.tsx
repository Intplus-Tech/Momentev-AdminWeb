export default function TodaysPayments() {
  return (
    <div className="bg-white rounded-xl p-6 text-sm space-y-3">
      <h3 className="font-medium">Today&apos;s Payments</h3>
      <p>Successful: 142 transactions (£8,942)</p>
      <p>Failed: 8 transactions (£420)</p>
      <p>Pending: 23 transactions (£1,150)</p>
      <p className="font-medium">Success Rate: 94.6%</p>
    </div>
  );
}


