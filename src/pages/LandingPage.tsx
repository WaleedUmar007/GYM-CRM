import { useNavigate } from "react-router-dom";
import { Image } from "antd";

const features = [
  {
    title: "Member Management",
    description:
      "Easily add, edit, and manage gym members with detailed profiles and membership status.",
  },
  {
    title: "Attendance Tracking",
    description:
      "Track member attendance and monitor gym usage patterns in real time.",
  },
  {
    title: "Payments & Plans",
    description:
      "Manage membership plans, process payments, and view payment history.",
  },
  {
    title: "Class Scheduling",
    description:
      "Organize and schedule fitness classes, assign trainers, and manage bookings.",
  },
  {
    title: "Trainer Management",
    description: "Maintain trainer profiles, schedules, and class assignments.",
  },
  {
    title: "Analytics Dashboard",
    description:
      "Visualize key metrics like revenue, attendance, and member growth.",
  },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-[#f6faff] relative pb-24 w-full">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6 bg-[#f6faff] w-full">
        <Image
          src={`./${window.env.REACT_APP_BRAND_LOGO}`}
          preview={false}
          height={Number(window.env.REACT_APP_BRAND_LOGO_NAVBAR_HEIGHT)}
          width={Number(window.env.REACT_APP_BRAND_LOGO_NAVBAR_WIDTH)}
          alt="Brand Logo"
          style={{ backgroundColor: "black", padding: "10px" }}
        />
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition-colors"
        >
          Login
          <span className="ml-1">→</span>
        </button>
      </header>

      {/* Hero Section - full width, no max-w, same bg */}
      <section className="w-full bg-[#f6faff] flex flex-col items-center justify-center text-center px-4 pt-8 pb-4">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 mt-8">
          Welcome to {window.env.REACT_APP_BRAND_FULL_NAME} CRM
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl">
          A comprehensive management system for your fitness facility.
          Streamline operations, manage members, and track performance all in
          one place.
        </p>
      </section>

      {/* Features Section - full width, same bg */}
      <section className="w-full bg-[#f6faff] py-16 text-center">
        <div className="mb-10">
          <div className="text-blue-600 font-semibold mb-2">
            Everything You Need
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Powerful Features for Gym Management
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-8 w-full">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-base">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer - fixed, full width, blue-600, increased height */}
      <footer className="fixed bottom-0 left-0 w-full bg-blue-600 text-center py-8 text-white text-base z-50 shadow-md">
        © {new Date().getFullYear()} {window.env.REACT_APP_BRAND_FULL_NAME}. All
        rights reserved. | Developed by DevHawks
      </footer>
    </div>
  );
}
