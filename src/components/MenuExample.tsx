import { useState } from "react";
import { useMenu } from "../hooks/useMenu";
import cheersIcon from "../assets/icons/cheers.png";
import { ClipLoader } from "react-spinners";

const MenuDisplay = () => {
  const { categories, loading, error } = useMenu();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter categories and items based on search term
  const filteredCategories = categories
    .map((category) => ({
      ...category,
      items: category.items.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          category.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((category) => category.items.length > 0);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-lg gap-4">
        <ClipLoader color="#ff6138" size={50} />
        <span className="text-gray-700">Cargando menú...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen gap-4">
        <p className="text-gray-700 text-lg text-center">
          Error al cargar el menú, por favor vuelve a intentar
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-brand-400 text-white font-medium rounded-full hover:bg-brand-500 transition-colors duration-200"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-5 font-sans">
      <h1 className="text-4xl font-bold text-center text-gray-700 mt-2 mb-8">
        Menú
      </h1>

      {/* Search and Category Index */}
      <div className="mb-4 py-4 bg-surface rounded-lg">
        {/* Search Bar */}
        <div className="px-2 mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-4 w-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg
                  className="h-4 w-4 text-gray-400 hover:text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Category Buttons */}
        <div className="px-2">
          <div
            className="flex gap-3 overflow-x-auto pb-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categories.map((category) => (
              <button
                key={`nav-${category.name}`}
                onClick={() => {
                  const element = document.getElementById(
                    `category-${category.name}`
                  );
                  element?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
                className="flex-shrink-0 px-4 py-2 text-sm font-medium text-white bg-brand-300 border border-brand-300 rounded-full hover:bg-brand-800 hover:border-brand-800 transition-colors duration-200 whitespace-nowrap"
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filteredCategories.map((category) => (
        <div
          key={category.name}
          id={`category-${category.name}`}
          className="mb-10"
        >
          <h2 className="text-gray-700 pb-2.5 mb-1 text-3xl font-bold">
            {category.name}
          </h2>

          <div className="grid gap-5">
            {category.items.map((item) => (
              <div
                key={item.id}
                className={`relative flex items-start p-4 border rounded-xl shadow-md gap-4 ${
                  item.stock === 0
                    ? "border-gray-200 bg-gray-50 opacity-60"
                    : "border-gray-300 bg-white"
                }`}
              >
                {/* Sin Stock Badge */}
                {item.stock === 0 && (
                  <div className="absolute top-2 right-2 bg-brand-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-md z-10">
                    Sin Stock
                  </div>
                )}

                {/* Image */}
                <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-gray-200 my-auto">
                  <img
                    src={
                      item.imageUrl && item.imageUrl.trim() !== ""
                        ? item.imageUrl
                        : cheersIcon
                    }
                    alt={item.name}
                    className={`w-20 h-20 object-cover ${
                      !item.imageUrl || item.imageUrl.trim() === ""
                        ? "opacity-40 brightness-150 contrast-75"
                        : ""
                    }`}
                    onError={(e) => {
                      // Use cheers icon as fallback if image fails to load
                      const img = e.target as HTMLImageElement;
                      if (img.src !== cheersIcon) {
                        img.src = cheersIcon;
                        // Apply filter when switching to fallback image
                        img.className =
                          "w-20 h-20 object-cover opacity-40 brightness-150 contrast-75";
                      }
                    }}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 my-auto">
                  <h3 className="m-0 mb-1 text-gray-600 text-xl font-bold font-">
                    {item.name}
                  </h3>
                  {item.description &&
                    item.description !== "Sin descripción disponible" && (
                      <p className="m-0 mb-0 text-gray-600 leading-relaxed text-sm">
                        {item.description}
                      </p>
                    )}
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg text-brand-300">
                      ${item.price.toLocaleString("es-AR")}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {filteredCategories.length === 0 && !loading && (
        <p className="text-center text-gray-600 text-lg mt-12">
          {searchTerm
            ? `No se encontraron productos que coincidan con "${searchTerm}"`
            : "No hay elementos en el menú disponibles en este momento."}
        </p>
      )}
    </div>
  );
};

export default MenuDisplay;
