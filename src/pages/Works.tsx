import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ExternalLink, CheckCircle, FileText } from 'lucide-react';
import { worksData } from '../data/works';
import { useEffect, useRef, useState } from 'react';


interface WorksProps {
  onPageChange: (page: string) => void;
}

export const Works = ({ onPageChange }: WorksProps) => {
  const { t } = useTranslation('common');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Long image scroll/drag state (one set per project card)
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const [translatePercents, setTranslatePercents] = useState<number[]>([]); // 0 to negative
  const translatePercentsRef = useRef<number[]>([]);
  const [maxDownPercents, setMaxDownPercents] = useState<number[]>([]); // negative values
  const isDraggingRef = useRef<boolean[]>([]);
  const dragStartYRef = useRef<number[]>([]);
  const didDragRef = useRef<boolean[]>([]);
  const animationIdsRef = useRef<number[]>([]);

  // Initialize per-card arrays
  useEffect(() => {
    const len = worksData.length;
    setTranslatePercents(new Array(len).fill(0));
    translatePercentsRef.current = new Array(len).fill(0);
    setMaxDownPercents(new Array(len).fill(-70)); // default fallback range
    isDraggingRef.current = new Array(len).fill(false);
    dragStartYRef.current = new Array(len).fill(0);
    didDragRef.current = new Array(len).fill(false);
    animationIdsRef.current = new Array(len).fill(0);
  }, []);

  // Compute max scroll when image loads
  const onImageLoad = (index: number) => {
    const img = imageRefs.current[index];
    const container = containerRefs.current[index];
    if (!img || !container) return;
    const imageHeight = img.naturalHeight || img.clientHeight;
    const containerHeight = container.clientHeight;
    if (containerHeight <= 0) return;
    // percentage the image can scroll within container
    const extra = Math.max(0, imageHeight - containerHeight);
    const maxDown = -Math.min(70, Math.round((extra / containerHeight) * 100));
    setMaxDownPercents(prev => {
      const next = [...prev];
      next[index] = -Math.abs(maxDown);
      return next;
    });
  };

  const AUTO_SPEED = 0.15; // smaller value => slower movement per frame (~9%/s at 60fps)

  const startAutoScroll = (index: number, direction: 'down' | 'up') => {
    cancelAnimationFrame(animationIdsRef.current[index]);
    const step = () => {
      const maxDown = maxDownPercents[index] ?? -70;
      const current = translatePercentsRef.current[index] ?? 0;
      let nextVal = current;

      if (direction === 'down') {
        if (current > maxDown) {
          nextVal = Math.max(maxDown, current - AUTO_SPEED);
          translatePercentsRef.current[index] = nextVal;
          setTranslatePercents(prev => {
            const next = [...prev];
            next[index] = nextVal;
            return next;
          });
          animationIdsRef.current[index] = requestAnimationFrame(step);
        } else {
          // reached bottom, bounce to top
          startAutoScroll(index, 'up');
        }
      } else {
        if (current < 0) {
          nextVal = Math.min(0, current + AUTO_SPEED);
          translatePercentsRef.current[index] = nextVal;
          setTranslatePercents(prev => {
            const next = [...prev];
            next[index] = nextVal;
            return next;
          });
          animationIdsRef.current[index] = requestAnimationFrame(step);
        } else {
          // reached top, stop
          cancelAnimationFrame(animationIdsRef.current[index]);
        }
      }
    };
    animationIdsRef.current[index] = requestAnimationFrame(step);
  };

  const stopAutoScroll = (index: number) => {
    cancelAnimationFrame(animationIdsRef.current[index]);
  };

  const handleMouseEnter = (index: number) => {
    // start auto scroll towards bottom
    startAutoScroll(index, 'down');
  };

  const handleMouseLeave = (index: number) => {
    stopAutoScroll(index);
    isDraggingRef.current[index] = false;
  };

  const handleMouseDown = (index: number, e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    stopAutoScroll(index);
    isDraggingRef.current[index] = true;
    dragStartYRef.current[index] = e.clientY;
    didDragRef.current[index] = false;
  };

  const handleMouseUp = (index: number) => {
    isDraggingRef.current[index] = false;
  };

  const handleMouseMove = (index: number, e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current[index]) return;
    const delta = e.clientY - dragStartYRef.current[index];
    dragStartYRef.current[index] = e.clientY;
    if (Math.abs(delta) > 1) didDragRef.current[index] = true;
    const container = containerRefs.current[index];
    if (!container) return;
    const deltaPercent = (delta / container.clientHeight) * 100;
    setTranslatePercents(prev => {
      const next = [...prev];
      const maxDown = maxDownPercents[index] ?? -70;
      let v = (next[index] ?? 0) + deltaPercent; // dragging down increases percent (upwards)
      // clamp between maxDown and 0
      if (v < maxDown) v = maxDown;
      if (v > 0) v = 0;
      next[index] = v;
      translatePercentsRef.current[index] = v;
      return next;
    });
  };

  return (
    <div className="min-h-screen text-gray-900 pt-24" style={{ background: 'linear-gradient(180deg, #F6FAFF 0%, #FFFFFF 100%)' }}>
      {/* Hero Section */}
      <section className="pt-12 pb-16 md:pt-16 md:pb-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
            <h1 className="text-3xl md:text-5xl font-bold mb-6 text-[#2F4766]">
              {t('works.title')}
            </h1>
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">
              {t('works.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Works List Section */}
      <section className="py-12 md:py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-10 md:space-y-16">
            {worksData.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-white border border-gray-200 rounded-2xl p-5 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
              >
                <div
                  className={`flex flex-col lg:flex-row items-center gap-6 lg:gap-12 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
                >
                  <div className="lg:w-1/2 w-full flex-shrink-0">
                    <div
                      ref={el => (containerRefs.current[index] = el)}
                      className="aspect-[4/3] bg-gray-100 overflow-hidden rounded-xl shadow-lg relative select-none"
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={() => handleMouseLeave(index)}
                      onMouseDown={(e) => handleMouseDown(index, e)}
                      onMouseUp={() => handleMouseUp(index)}
                      onMouseMove={(e) => handleMouseMove(index, e)}
                      style={{ cursor: 'grab' }}
                    >
                      <img
                        ref={el => (imageRefs.current[index] = el)}
                        src={project.image}
                        alt={t(project.titleKey)}
                        onLoad={() => onImageLoad(index)}
                        className="w-full"
                        style={{
                          display: 'block',
                          minHeight: '180%',
                          transform: `translateY(${translatePercents[index] ?? 0}%)`,
                          transition: isDraggingRef.current[index] ? 'none' : 'transform 120ms linear',
                        }}
                      />
                    </div>
                  </div>

                  <div className="lg:w-1/2 w-full min-w-0">
                    <h3 className="text-xl md:text-3xl font-bold text-[#2F4766] mb-3 md:mb-4 break-words">{t(project.titleKey)}</h3>
                    <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 break-words">{t(project.descriptionKey)}</p>

                    <div className="inline-flex items-center text-gray-700 bg-gray-50 rounded-lg px-4 py-2.5 mb-6">
                      <FileText className="w-4 h-4 mr-2 text-[#0EA5FF] flex-shrink-0" />
                      <span className="text-sm md:text-base font-semibold">{t('works.pageCount', { count: project.pageCount })}</span>
                    </div>

                    <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                      {project.features.map((feature, fIndex) => (
                        <div key={fIndex} className="flex items-start text-sm md:text-base text-gray-600">
                          <CheckCircle className="w-5 h-5 mr-3 mt-0.5 text-[#0EA5FF] flex-shrink-0" />
                          <span className="break-words">{t(feature)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto flex">
                      <a href={project.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 md:px-6 md:py-3 bg-[#0EA5FF] hover:bg-[#0284C7] text-white font-semibold text-sm md:text-base rounded-lg transition-all duration-200 shadow-sm hover:shadow-md group">
                        {t('works.visitSite')}
                        <ExternalLink className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}; 