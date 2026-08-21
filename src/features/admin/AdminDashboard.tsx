"use client";

import { MOCK_REGISTRATIONS } from "@/lib/event-data";
import { AdminStats } from "./AdminStats";

export function AdminDashboard() {
  const rows = MOCK_REGISTRATIONS;
  const eventPrice = 140;

  const stats = rows.reduce(
    (acc, user) => {
      acc.confirmed += user.status === "confirmado" ? 1 : 0;
      acc.pending += user.status === "pendente" ? 1 : 0;

      return acc;
    },
    {
      total: rows.length,
      confirmed: 0,
      pending: 0,
      revenue: rows.length * eventPrice,
    },
  );

  return (
    <section className="w-full overflow-hidden">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-4 mx-5 pb-24 pt-24 md:pt-32 md:mx-20">
        <AdminStats {...stats} />
      </div>
    </section>
  );
}
