import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { worksData } from '../data/works';
import { ArrowRight, FileText, CheckCircle, ExternalLink } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';

interface WorksSummaryProps {
  onPageChange: (page: string) => void;
}

export const WorksSummary = ({ onPageChange }: WorksSummaryProps) => {
  const { t } = useTranslation('common');
  const displayedWorks = worksData.slice(0, 2);

  // 与 works 页面一致的滚动/拖拽实现
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const [translatePercents, setTranslatePercents] = useState<number[]>([]);
  const translatePercentsRef = useRef<number[]>([]);
  const [maxDownPercents, setMaxDownPercents] = useState<number[]>([]);
  const isDraggingRef = useRef<boolean[]>([]);
  const dragStartYRef = useRef<number[]>([]);
  const animationIdsRef = useRef<number[]>([]);

  useEffect(() => {
    const len = displayedWorks.length;
    setTranslatePercents(new Array(len).fill(0));
    translatePercentsRef.current = new Array(len).fill(0);
    setMaxDownPercents(new Array(len).fill(-70));
    isDraggingRef.current = new Array(len).fill(false);
    dragStartYRef.current = new Array(len).fill(0);
    animationIdsRef.current = new Array(len).fill(0);
  }, []);

  const onImageLoad = (index: number) => {
    const img = imageRefs.current[index];
    const container = containerRefs.current[index];
    if (!img || !container) return;
    const imageHeight = img.naturalHeight || img.clientHeight;
    const containerHeight = container.clientHeight;
    if (containerHeight <= 0) return;
    const extra = Math.max(0, imageHeight - containerHeight);
    const maxDown = -Math.min(70, Math.round((extra / containerHeight) * 100));
    setMaxDownPercents(prev => {
      const next = [...prev];
      next[index] = -Math.abs(maxDown);
      return next;
    });
  };

  const AUTO_SPEED = 0.15;

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
  };

  const handleMouseUp = (index: number) => {
    isDraggingRef.current[index] = false;
  };

  const handleMouseMove = (index: number, e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current[index]) return;
    const delta = e.clientY - dragStartYRef.current[index];
    dragStartYRef.current[index] = e.clientY;
    const container = containerRefs.current[index];
    if (!container) return;
    const deltaPercent = (delta / container.clientHeight) * 100;
    setTranslatePercents(prev => {
      const next = [...prev];
      const maxDown = maxDownPercents[index] ?? -70;
      let v = (next[index] ?? 0) + deltaPercent;
      if (v < maxDown) v = maxDown;
      if (v > 0) v = 0;
      next[index] = v;
      translatePercentsRef.current[index] = v;
      return next;
    });
  };

  return (
    <section className="py-12 md:py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-5 text-[#2F4766]">
            <span className="text-[#0EA5FF]">
              {t('works.title')}
            </span>
          </h2>
          {/* 删除描述以与页面背景更统一 */}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-14">
          {displayedWorks.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-300"
            >
              <div
                ref={el => (containerRefs.current[index] = el)}
                className="aspect-[2/2] overflow-hidden relative"
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
              <div className="p-5 md:p-6 flex flex-col flex-grow">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900 flex-1">{t(project.titleKey)}</h3>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="ml-3 p-2 text-gray-400 hover:text-[#0EA5FF] hover:bg-gray-50 rounded-lg transition-colors duration-200"
                    title="サイトを見る"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>

                <div className="space-y-3 mt-4 flex-grow">
                  {project.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-start text-sm md:text-base text-gray-700">
                      <CheckCircle className="w-4 h-4 mr-3 mt-0.5 text-[#0EA5FF] flex-shrink-0" />
                      <span>{t(feature)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onPageChange('works')}
            className="inline-flex items-center px-6 py-4 md:px-9 md:py-5 border border-[#0EA5FF] text-[#0EA5FF] font-semibold text-base md:text-lg rounded-xl hover:bg-[#0EA5FF] hover:text-white transition-all duration-200"
          >
            {t('home.works.cta')}
            <ArrowRight className="w-5 h-5 ml-2" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};