import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { worksData } from '../data/works';
import { ArrowRight, FileText, CheckCircle, ExternalLink, ChevronUp, ChevronDown } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';

interface WorksSummaryProps {
  onPageChange: (page: string) => void;
}

export const WorksSummary = ({ onPageChange }: WorksSummaryProps) => {
  const { t } = useTranslation('common');
  const displayedWorks = worksData.slice(0, 2);
  
  // 为每个项目创建ref和状态
  const imageContainerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const [isHovering, setIsHovering] = useState<boolean[]>([]);
  const scrollDirectionRefs = useRef<('up' | 'down' | 'none')[]>([]);
  const [scrollPositions, setScrollPositions] = useState<number[]>([]);
  const [imageHeights, setImageHeights] = useState<number[]>([]);

  // 初始化状态
  useEffect(() => {
    setIsHovering(new Array(displayedWorks.length).fill(false));
    scrollDirectionRefs.current = new Array(displayedWorks.length).fill('down');
    setScrollPositions(new Array(displayedWorks.length).fill(0));
    setImageHeights(new Array(displayedWorks.length).fill(0));
  }, []);

  // 监听图片加载
  useEffect(() => {
    const handleImageLoad = (index: number) => {
      const img = imageRefs.current[index];
      if (img) {
        const container = imageContainerRefs.current[index];
        if (container) {
          const containerHeight = container.clientHeight;
          const imageHeight = img.naturalHeight;
          const maxScroll = Math.max(0, (imageHeight / containerHeight * 100) - 100);
          setImageHeights(prev => {
            const newHeights = [...prev];
            newHeights[index] = maxScroll;
            return newHeights;
          });
        }
      }
    };

    displayedWorks.forEach((_, index) => {
      const img = imageRefs.current[index];
      if (img) {
        if (img.complete) {
          handleImageLoad(index);
        } else {
          img.addEventListener('load', () => handleImageLoad(index));
        }
      }
    });
  }, []);

  // 处理自动滚动动画
  useEffect(() => {
    const animations = displayedWorks.map((_, index) => {
      let animationFrameId: number;

      const animate = () => {
        if (isHovering[index]) {
          const direction = scrollDirectionRefs.current[index];
          const currentPosition = scrollPositions[index];
          let scrollSpeed = 0;
          let shouldContinue = true;

          // 调整滚动范围，考虑图片下方有内容
          // 为不同项目设置不同的滚动范围
          let maxDownScroll = -70; // 默认滚动范围
          
          // 为大爽観光バス项目设置特定的滚动范围
          const project = displayedWorks[index];
          if (project.id === 'daisoubus') {
            maxDownScroll = -65; // 大爽観光バス使用 -65%
          }

          // 简化的边界检查
          if (direction === 'down') {
            if (currentPosition > maxDownScroll) {
              scrollSpeed = -0.5;
            } else {
              // 到达底部边界，停止动画循环
              shouldContinue = false;
            }
          } else if (direction === 'up') {
            if (currentPosition < 0) {
              scrollSpeed = 0.5;
            } else {
              // 到达顶部边界，停止动画循环
              shouldContinue = false;
            }
          }

          if (scrollSpeed !== 0) {
            setScrollPositions(prev => {
              const newPositions = [...prev];
              let newPosition = newPositions[index] + scrollSpeed;
              
              // 严格限制边界
              if (newPosition < maxDownScroll) {
                newPosition = maxDownScroll;
              } else if (newPosition > 0) {
                newPosition = 0;
              }
              
              newPositions[index] = newPosition;
              return newPositions;
            });
          }

          // 只有在应该继续且悬停时才继续动画
          if (shouldContinue && isHovering[index]) {
            animationFrameId = requestAnimationFrame(animate);
          }
        }
      };

      if (isHovering[index]) {
        animationFrameId = requestAnimationFrame(animate);
      }

      return () => {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
      };
    });

    return () => {
      animations.forEach(cleanup => cleanup());
    };
  }, [isHovering, scrollPositions]);

  // 处理鼠标移动 - 用于控制滚动方向
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>, index: number) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const y = event.clientY - rect.top;
    const centerY = rect.height / 2;
    
    // 根据鼠标位置设置滚动方向（上半部分向上，下半部分向下）
    scrollDirectionRefs.current[index] = y < centerY ? 'up' : 'down';
  };

  // 处理鼠标进入
  const handleMouseEnter = (index: number) => {
    setIsHovering(prev => {
      const newHovering = [...prev];
      newHovering[index] = true;
      return newHovering;
    });
    // 初始设置为向下滚动
    scrollDirectionRefs.current[index] = 'down';
  };

  // 处理鼠标离开
  const handleMouseLeave = (index: number) => {
    setIsHovering(prev => {
      const newHovering = [...prev];
      newHovering[index] = false;
      return newHovering;
    });
    scrollDirectionRefs.current[index] = 'none';
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            {t('works.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('works.description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
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
                ref={el => imageContainerRefs.current[index] = el}
                className="aspect-[2/2] overflow-hidden relative"
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
                style={{
                  cursor: 'ns-resize',
                }}
              >
                <img
                  ref={el => imageRefs.current[index] = el}
                  src={project.image}
                  alt={t(project.titleKey)}
                  className="w-full"
                  style={{
                    display: 'block',
                    minHeight: '200%',
                    transform: `translateY(${scrollPositions[index]}%)`,
                    transition: 'transform 100ms linear',
                  }}
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 flex-1">{t(project.titleKey)}</h3>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="ml-3 p-2 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors duration-200"
                    title="サイトを見る"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>

                <div className="space-y-3 mt-4 flex-grow">
                  {project.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-start text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 mr-3 mt-0.5 text-teal-600 flex-shrink-0" />
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
            className="inline-flex items-center px-8 py-4 border-2 border-teal-500 text-teal-600 font-semibold text-lg rounded-xl hover:bg-teal-500 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
          >
            {t('home.works.cta')}
            <ArrowRight className="w-5 h-5 ml-2" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};