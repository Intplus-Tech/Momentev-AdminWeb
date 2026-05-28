import ReviewsClient from "./_components/reviews-client";

export default async function AdminReviewsPage() {
  return (
    <section className="w-full px-4 md:px-8 py-6 space-y-6 bg-[#F4F5F8] min-h-[calc(100vh-72px)]">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold">Reviews</h1>
          <p className="text-sm text-gray-500">Audit and moderate platform reviews.</p>
        </div>
      </div>

      {/* Client handles URL state and data fetching */}
      <ReviewsClient />
    </section>
  );
}
