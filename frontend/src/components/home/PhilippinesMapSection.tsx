import React, { useState } from "react";
import { Navigation, MapPin, Building, Home, Factory } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProjectLocation {
  id: number;
  name: string;
  region: string;
  type: "residential" | "commercial" | "industrial";
  projects: number;
  icon: React.ElementType;
}

const projectLocations: ProjectLocation[] = [
  // Luzon
  {
    id: 1,
    name: "Claveria",
    region: "Northern Luzon",
    type: "residential",
    projects: 2,
    icon: Home,
  },
  {
    id: 2,
    name: "Tuguegarao",
    region: "Northern Luzon",
    type: "commercial",
    projects: 3,
    icon: Building,
  },
  {
    id: 11,
    name: "Manila",
    region: "Northern Luzon",
    type: "commercial",
    projects: 5,
    icon: Building,
  },
  {
    id: 12,
    name: "Baguio",
    region: "Northern Luzon",
    type: "residential",
    projects: 7,
    icon: Home,
  },
  // Central Visayas
  {
    id: 3,
    name: "Cebu",
    region: "Central Visayas",
    type: "commercial",
    projects: 4,
    icon: Building,
  },
  {
    id: 4,
    name: "Bohol",
    region: "Central Visayas",
    type: "residential",
    projects: 6,
    icon: Home,
  },
  {
    id: 13,
    name: "Iloilo",
    region: "Central Visayas",
    type: "industrial",
    projects: 9,
    icon: Factory,
  },
  {
    id: 14,
    name: "Boracay",
    region: "Central Visayas",
    type: "residential",
    projects: 3,
    icon: Home,
  },
  // Mindanao
  {
    id: 5,
    name: "Cagayan de Oro",
    region: "Mindanao",
    type: "industrial",
    projects: 12,
    icon: Factory,
  },
  {
    id: 6,
    name: "Iligan",
    region: "Mindanao",
    type: "industrial",
    projects: 7,
    icon: Factory,
  },
  {
    id: 7,
    name: "Agusan",
    region: "Mindanao",
    type: "residential",
    projects: 4,
    icon: Home,
  },
  {
    id: 8,
    name: "Bukidnon",
    region: "Mindanao",
    type: "residential",
    projects: 6,
    icon: Home,
  },
  {
    id: 9,
    name: "General Santos",
    region: "Mindanao",
    type: "commercial",
    projects: 8,
    icon: Building,
  },
  {
    id: 10,
    name: "Zamboanga",
    region: "Mindanao",
    type: "industrial",
    projects: 4,
    icon: Factory,
  },
  {
    id: 15,
    name: "Davao",
    region: "Mindanao",
    type: "commercial",
    projects: 15,
    icon: Building,
  },
  {
    id: 16,
    name: "Dinagat Island",
    region: "Mindanao",
    type: "residential",
    projects: 4,
    icon: Home,
  },
];

// City marker positions (percentage-based for responsive positioning)
interface CityMarker {
  city: string;
  top: string;
  left: string;
  type: "residential" | "commercial" | "industrial";
}

const cityMarkers: CityMarker[] = [
  // Northern Luzon - Positioned next to circles on the map, not covering text
  { city: "Claveria", top: "12%", left: "58%", type: "residential" }, // Green circle - upper right
  { city: "Tuguegarao", top: "20%", left: "54%", type: "commercial" }, // Blue circle - below Claveria

  // Visayas - Positioned next to circles on the left side
  { city: "Cebu", top: "39%", left: "45%", type: "commercial" }, // Blue circle - left side
  { city: "Bohol", top: "51%", left: "35%", type: "residential" }, // Orange circle - left side below Cebu

  // Mindanao - Positioned next to circles, avoiding text labels
  { city: "Dinagat Island", top: "63%", left: "72%", type: "residential" }, // Green circle - positioned beside circle and label
  { city: "Cagayan de Oro", top: "73%", left: "60%", type: "industrial" }, // Orange circle - center
  { city: "Iligan", top: "76%", left: "50%", type: "industrial" }, // Orange circle - left center
  { city: "Agusan", top: "77%", left: "80%", type: "residential" }, // Green circle - right side
  { city: "Bukidnon", top: "83%", left: "72%", type: "residential" }, // Orange circle - positioned beside BUKIDNON text
  { city: "Zamboanga", top: "85%", left: "40%", type: "industrial" }, // Green circle - positioned beside circle on left side
  { city: "General Santos", top: "92%", left: "65%", type: "commercial" }, // Gray circle - bottom center
];

const PhilippinesMapSection: React.FC = () => {
  const navigate = useNavigate();
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  const projectTypeColors = {
    residential: "text-emerald-500",
    commercial: "text-blue-500",
    industrial: "text-amber-500",
  };

  const projectTypeBgColors = {
    residential: "bg-emerald-500",
    commercial: "bg-blue-500",
    industrial: "bg-amber-500",
  };

  const regionColors = {
    "Northern Luzon": "text-red-500",
    "Central Visayas": "text-purple-500",
    Mindanao: "text-cyan-500",
  };

  const getProjectTypeBgColorClass = (type: string) =>
    projectTypeBgColors[type as keyof typeof projectTypeBgColors] ||
    "bg-gray-500";

  const getRegionColorClass = (region: string) =>
    regionColors[region as keyof typeof regionColors] || "text-gray-500";

  const totalProjects = projectLocations.reduce(
    (sum, loc) => sum + loc.projects,
    0
  );
  const totalCities = new Set(projectLocations.map((loc) => loc.name)).size;
  const totalRegions = new Set(projectLocations.map((loc) => loc.region)).size;

  const regionalProjectCounts = projectLocations.reduce((acc, loc) => {
    acc[loc.region] = (acc[loc.region] || 0) + loc.projects;
    return acc;
  }, {} as Record<string, number>);

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-br from-blue-50 via-white to-green-50 overflow-hidden">
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600 mb-2">
            Our Reach
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-700 to-green-600 bg-clip-text text-transparent">
            Delivering Excellence Across the Philippines
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Explore our diverse portfolio of completed prefabricated projects,
            showcasing our nationwide presence and commitment to quality,
            efficiency, and tailored solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 space-y-8">
            <p className="text-gray-700 text-lg leading-relaxed">
              From the vibrant urban centers to the serene rural landscapes,
              Camco Prefab has left its mark. Our projects range from modular
              homes providing rapid housing solutions, to cutting-edge prefab
              offices fostering modern workspaces, and robust industrial
              facilities supporting vital industries. Each completed structure
              is a testament to our adaptability and precision, engineered to
              meet the unique demands of clients across the archipelago.
            </p>

            {/* Project Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-white rounded-2xl shadow-xl border border-green-200 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <div className="text-5xl font-extrabold text-green-600 mb-2 drop-shadow-md">
                  {totalProjects}+
                </div>
                <div className="text-md text-gray-700 font-semibold">
                  Total Projects
                </div>
              </div>
              <div className="text-center p-6 bg-white rounded-2xl shadow-xl border border-blue-200 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <div className="text-5xl font-extrabold text-blue-600 mb-2 drop-shadow-md">
                  {totalCities}
                </div>
                <div className="text-md text-gray-700 font-semibold">
                  Cities Covered
                </div>
              </div>
              <div className="text-center p-6 bg-white rounded-2xl shadow-xl border border-purple-200 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <div className="text-5xl font-extrabold text-purple-600 mb-2 drop-shadow-md">
                  {totalRegions}
                </div>
                <div className="text-md text-gray-700 font-semibold">
                  Key Regions
                </div>
              </div>
            </div>

            {/* Regional Overview */}
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
              <h3 className="font-bold text-xl text-gray-900 mb-4">
                Regional Distribution
              </h3>
              <div className="space-y-3">
                {Object.entries(regionalProjectCounts).map(
                  ([region, count]) => (
                    <div
                      key={region}
                      className="flex items-center justify-between group cursor-default"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-full ${getRegionColorClass(
                            region
                          ).replace(
                            "text-",
                            "bg-"
                          )} shadow-sm group-hover:scale-110 transition-transform`}
                        ></div>
                        <span className="text-lg text-gray-700 font-medium group-hover:text-gray-900 transition-colors">
                          {region}
                        </span>
                      </div>
                      <span className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                        {count} projects
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => navigate("/projects")}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-full flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg font-semibold"
              >
                <Navigation className="h-5 w-5 mr-1" />
                View All Projects
              </button>
              <button
                onClick={() => navigate("/contact")}
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg font-semibold"
              >
                Contact Our Team
              </button>
            </div>
          </div>

          {/* Map Image */}
          <div className="flex justify-center order-1 lg:order-2 relative">
            <div className="relative w-full max-w-lg">
              <div className="relative p-8 bg-white rounded-3xl shadow-2xl border border-gray-200">
                <div className="relative">
                  <img
                    src="https://camcoprefabricatedstructures.com/wp-content/uploads/2024/08/5-32741-1-1024x1024.png"
                    alt="Philippines Project Locations Map"
                    className="w-full h-auto rounded-2xl"
                    onError={(e) => {
                      // Fallback if image doesn't load
                      e.currentTarget.src =
                        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500"%3E%3Crect fill="%23E5E7EB" width="400" height="500"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%236B7280" font-size="18" font-family="sans-serif"%3EMap Image Placeholder%3C/text%3E%3Ctext x="50%25" y="55%25" text-anchor="middle" fill="%239CA3AF" font-size="12" font-family="sans-serif"%3EReplace with your map image%3C/text%3E%3C/svg%3E';
                    }}
                  />

                  {/* Interactive City Markers */}
                  {cityMarkers.map((marker) => {
                    const cityData = projectLocations.find(
                      (loc) => loc.name === marker.city
                    );
                    const Icon = cityData?.icon || MapPin;

                    // Premium gradient colors based on type
                    const gradientClasses = {
                      residential:
                        "from-emerald-400 via-emerald-500 to-emerald-600",
                      commercial: "from-blue-400 via-blue-500 to-blue-600",
                      industrial: "from-amber-400 via-amber-500 to-amber-600",
                    };

                    const glowClasses = {
                      residential: "shadow-emerald-500/50",
                      commercial: "shadow-blue-500/50",
                      industrial: "shadow-amber-500/50",
                    };

                    return (
                      <button
                        key={marker.city}
                        onClick={() => navigate("/projects")}
                        onMouseEnter={() => setHoveredCity(marker.city)}
                        onMouseLeave={() => setHoveredCity(null)}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10"
                        style={{ top: marker.top, left: marker.left }}
                        aria-label={`View projects in ${marker.city}`}
                      >
                        {/* Outer Pulsing Ring - Subtle */}
                        <div
                          className={`absolute inset-0 w-12 h-12 -left-3 -top-3 rounded-full bg-gradient-to-br ${
                            gradientClasses[
                              marker.type as keyof typeof gradientClasses
                            ]
                          } opacity-20 animate-ping-slow`}
                        ></div>

                        {/* Middle Glow Ring */}
                        <div
                          className={`absolute inset-0 w-10 h-10 -left-2 -top-2 rounded-full bg-gradient-to-br ${
                            gradientClasses[
                              marker.type as keyof typeof gradientClasses
                            ]
                          } opacity-30 blur-md group-hover:opacity-50 transition-opacity duration-500`}
                        ></div>

                        {/* Main Marker Container with Glass Morphism */}
                        <div
                          className={`relative w-8 h-8 rounded-full bg-gradient-to-br ${
                            gradientClasses[
                              marker.type as keyof typeof gradientClasses
                            ]
                          } border-2 border-white/80 shadow-lg ${
                            glowClasses[marker.type as keyof typeof glowClasses]
                          } backdrop-blur-sm transform transition-all duration-500 ease-out group-hover:scale-[2] group-hover:shadow-2xl group-hover:border-white group-hover:rotate-12`}
                        >
                          {/* Glossy Overlay Effect */}
                          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-60"></div>

                          {/* Icon - Hidden by default, shown on hover */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                            <Icon
                              className="w-4 h-4 text-white drop-shadow-lg"
                              strokeWidth={2.5}
                            />
                          </div>

                          {/* Inner Dot - Visible by default, hidden on hover */}
                          <div className="absolute inset-0 m-auto w-2.5 h-2.5 bg-white rounded-full shadow-inner group-hover:opacity-0 transition-opacity duration-300"></div>

                          {/* Shimmer Effect */}
                          <div className="absolute inset-0 rounded-full overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                          </div>
                        </div>

                        {/* Premium Tooltip on Hover */}
                        {hoveredCity === marker.city && (
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 pointer-events-none z-20 animate-tooltip-in">
                            <div className="relative px-4 py-3 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white rounded-xl shadow-2xl border border-white/10 backdrop-blur-xl">
                              {/* Subtle Inner Glow */}
                              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 to-transparent"></div>

                              <div className="relative text-center space-y-1">
                                {/* City Name with Icon */}
                                <div className="flex items-center gap-2 justify-center">
                                  <Icon
                                    className="w-3.5 h-3.5 text-white/90"
                                    strokeWidth={2.5}
                                  />
                                  <div className="font-bold text-sm tracking-wide">
                                    {marker.city}
                                  </div>
                                </div>

                                {cityData && (
                                  <div className="flex items-center gap-1.5 justify-center text-xs">
                                    <div
                                      className={`w-1.5 h-1.5 rounded-full ${getProjectTypeBgColorClass(
                                        marker.type
                                      )} shadow-sm`}
                                    ></div>
                                    <span className="text-gray-300 font-medium">
                                      {cityData.projects}{" "}
                                      {cityData.projects === 1
                                        ? "project"
                                        : "projects"}
                                    </span>
                                  </div>
                                )}

                                {/* Project Type Badge */}
                                <div className="pt-1">
                                  <span
                                    className={`inline-block px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full ${getProjectTypeBgColorClass(
                                      marker.type
                                    )} text-white shadow-sm`}
                                  >
                                    {marker.type}
                                  </span>
                                </div>
                              </div>

                              {/* Elegant Arrow */}
                              <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-px">
                                <div className="border-[6px] border-transparent border-t-gray-900"></div>
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full border-[5px] border-transparent border-t-gray-800"></div>
                              </div>
                            </div>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="text-sm font-bold text-gray-800 mb-3">
                    Project Types
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {Object.entries(projectTypeColors).map(
                      ([type, colorClass]) => (
                        <div key={type} className="flex items-center gap-2">
                          <div
                            className={`w-3 h-3 rounded-full ${colorClass.replace(
                              "text-",
                              "bg-"
                            )}`}
                          ></div>
                          <span className="text-xs text-gray-700 capitalize">
                            {type}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(5px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
        
        @keyframes tooltip-in {
          0% {
            opacity: 0;
            transform: translateX(-50%) translateY(8px) scale(0.9);
          }
          100% {
            opacity: 1;
            transform: translateX(-50%) translateY(0) scale(1);
          }
        }
        
        @keyframes ping-slow {
          0% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.3);
            opacity: 0.1;
          }
          100% {
            transform: scale(1.6);
            opacity: 0;
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        
        .animate-tooltip-in {
          animation: tooltip-in 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .animate-ping-slow {
          animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </section>
  );
};

export default PhilippinesMapSection;
