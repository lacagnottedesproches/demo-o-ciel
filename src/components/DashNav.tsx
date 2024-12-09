import { useRouter } from "next/router";

const DashNav = () => {
  const router = useRouter();
  const items = [
    {
      id: "/app",
      label: "Dashboard",
    },
    {
      id: "/app/cagnottes",
      label: "Mes cagnottes",
    },
    {
      id: "/app/creation",
      label: "Espace création",
    },
  ];

  return (
    <nav>
      <ul className="flex flex-row items-center gap-3">
        {items.map((i) => {
          return (
            <li key={i.id}>
              <button
                onClick={() => router.push(i.id)}
                className={`rounded-full px-3 py-2 ${router.pathname === i.id ? "bg-yellow-500 text-white font-bold" : "border"}`}
                type="button"
              >
                {i.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default DashNav;
