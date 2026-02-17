import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState, useCallback } from "react";

interface ServiceDetail {
  title: string;
  content: string;
}

interface Service {
  id: string;
  title: string;
  shortDescription?: string;
  description?: string;
  icon: any;
  images: string[];
}

// Backward compatible props for partner services
interface LegacyServiceModalProps {
  imageUrl: string;
  title: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
}

// New service-based props
interface ServiceModalProps {
  service: Service;
  isOpen: boolean;
  onClose: () => void;
}

// Union type for both interfaces
type ModalProps = ServiceModalProps | (LegacyServiceModalProps & { service?: never });

export function ServiceModal(props: ModalProps) {
  const { isOpen, onClose } = props;
  
  // Check if using new service format or legacy format
  const isServiceFormat = 'service' in props && props.service !== undefined;
  
  // Normalize service data
  const serviceData = isServiceFormat 
    ? props.service 
    : {
        title: props.title,
        description: props.description,
        images: [props.imageUrl],
        details: [] as ServiceDetail[]
      };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % serviceData.images.length);
  }, [serviceData.images.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + serviceData.images.length) % serviceData.images.length);
  }, [serviceData.images.length]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setCurrentImageIndex(0);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevImage();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        nextImage();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyboard);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyboard);
    };
  }, [isOpen, onClose, prevImage, nextImage]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl max-h-[90vh] w-full bg-white rounded-lg overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition-colors p-2 bg-white rounded-full shadow-lg z-20"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="max-h-[90vh] overflow-y-auto">
          {/* Image Carousel */}
          <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
            <div
              className="flex transition-transform duration-500 ease-in-out h-full"
              style={{
                transform: `translateX(-${currentImageIndex * 100}%)`,
              }}
            >
              {serviceData.images.map((image, index) => (
                <div key={index} className="min-w-full w-full h-full flex-shrink-0">
                  <img
                    src={image}
                    alt={`${serviceData.title} - Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Carousel Navigation */}
            {serviceData.images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#001f3f] p-3 rounded-full shadow-lg transition-all hover:scale-110 z-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#001f3f] p-3 rounded-full shadow-lg transition-all hover:scale-110 z-10"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Image Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {serviceData.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(index);
                      }}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentImageIndex
                          ? "bg-white w-8"
                          : "bg-white/50 hover:bg-white/75"
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[#001f3f] mb-4">
              {serviceData.title}
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg mb-8">
              {serviceData.description}
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}
