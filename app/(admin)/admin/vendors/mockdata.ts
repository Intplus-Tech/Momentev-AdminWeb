type VendorStatus =
  | "Active"
  | "Review"
  | "Recently Approved"
  | "Flagged"
  | "Suspended";

interface Vendor {
  id: string;
  name: string;
  category: string;
  status: VendorStatus;
  rating: string;
}


export const vendors: Vendor[] = [
  {
    id: "V-7891",
    name: "Elegant weddings",
    category: "Photography",
    status: "Active",
    rating: "★★★★☆",
  },
  {
    id: "V-7892",
    name: "London Category Co.",
    category: "Catering",
    status: "Review",
    rating: "★★★★☆",
  },
  {
    id: "V-7893",
    name: "Premier",
    category: "Venues",
    status: "Recently Approved",
    rating: "★★★★★",
  },
  {
    id: "V-7894",
    name: "Magic Moment",
    category: "Planning",
    status: "Review",
    rating: "-----",
  },
  {
    id: "V-7895",
    name: "City Sounds DJ",
    category: "Entertainment",
    status: "Suspended",
    rating: "★★★☆☆",
  },
];