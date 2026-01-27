export default function PaymentMethods() {
  const methods = [
    ["Credit/Debit Card", "78%"],
    ["Apple Pay", "12%"],
    ["Google Pay", "8%"],
    ["Bank Transfer", "2%"],
  ];

  return (
    <div className="bg-white rounded-xl p-6">
      <h3 className="font-medium mb-4">Payment Methods</h3>
      <div className="space-y-3 text-sm">
        {methods.map(([method, percent]) => (
          <div key={method} className="flex justify-between">
            <span>{method}</span>
            <span>{percent}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
