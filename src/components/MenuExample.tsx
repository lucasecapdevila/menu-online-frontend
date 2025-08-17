import { useMenu } from "../hooks/useMenu";
import cheersIcon from "../assets/icons/cheers.png";

const MenuDisplay = () => {
  const { categories, loading, error } = useMenu();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px] text-lg text-gray-600">
        Cargando menú...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-5 text-base">
        Error al cargar el menú: {error}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-5 font-sans">
      <h1 className="text-4xl font-bold text-center text-gray-700 mt-6 mb-10">
        Menú
      </h1>

      {categories.map((category) => (
        <div key={category.name} className="mb-10">
          <h2 className="text-brand-300 pb-2.5 mb-2 text-3xl font-bold">
            {category.name}
          </h2>

          <div className="grid gap-5">
            {category.items
              .filter((item) => item.available) // Solo mostrar items disponibles
              .map((item) => (
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
                      src={item.imageUrl && item.imageUrl.trim() !== "" ? item.imageUrl : cheersIcon}
                      alt={item.name}
                      className={`w-20 h-20 object-cover ${
                        (!item.imageUrl || item.imageUrl.trim() === "") 
                          ? "opacity-40 brightness-150 contrast-75" 
                          : ""
                      }`}
                      onError={(e) => {
                        // Use cheers icon as fallback if image fails to load
                        const img = e.target as HTMLImageElement;
                        if (img.src !== cheersIcon) {
                          img.src = cheersIcon;
                          // Apply filter when switching to fallback image
                          img.className = "w-20 h-20 object-cover opacity-40 brightness-150 contrast-75";
                        }
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 my-auto">
                    <h3 className="m-0 mb-1 text-gray-800 text-xl font-bold font-">
                      {item.name}
                    </h3>
                    {item.description &&
                      item.description !== "Sin descripción disponible" && (
                        <p className="m-0 mb-0 text-gray-600 leading-relaxed text-sm">
                          {item.description}
                        </p>
                      )}
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg text-brand-500">
                        ${item.price.toLocaleString("es-AR")}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}

      {categories.length === 0 && !loading && (
        <p className="text-center text-gray-600 text-lg mt-12">
          No hay elementos en el menú disponibles en este momento.
        </p>
      )}
    </div>
  );
};

export default MenuDisplay;
