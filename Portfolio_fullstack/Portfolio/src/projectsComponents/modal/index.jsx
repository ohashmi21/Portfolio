import React, { useEffect, useRef, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'bootstrap/dist/css/bootstrap.min.css';
const { getProjectImageUrl } = require('@/pages/api/data/projectData.js');

const ProjectModal = ({ show, onHide, project }) => {
  const images = project.Images?.length ? project.Images : [];
  const descriptionRef = useRef(null);
  const [showScrollFade, setShowScrollFade] = useState(false);

  const updateScrollFade = () => {
    const el = descriptionRef.current;
    if (!el) {
      return;
    }
    const remainingScroll = el.scrollHeight - el.clientHeight - el.scrollTop;
    setShowScrollFade(remainingScroll > 4);
  };

  useEffect(() => {
    if (!show) {
      return;
    }
    updateScrollFade();
    window.addEventListener('resize', updateScrollFade);
    return () => window.removeEventListener('resize', updateScrollFade);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, project]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      dialogClassName="projectModalDialog"
      contentClassName="projectModalContent"
    >
      <button type="button" className="projectModalClose" onClick={onHide} aria-label="Close">
        &times;
      </button>
      <div className="projectModalLayout">
        <div className="projectModalGallery">
          {images.length > 0 ? (
            <Swiper
              modules={[Navigation, Pagination]}
              navigation={images.length > 1}
              pagination={images.length > 1 ? { clickable: true } : false}
              spaceBetween={10}
              slidesPerView={1}
              className="projectGallerySwiper"
            >
              {images.map((image, index) => (
                <SwiperSlide key={image}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={getProjectImageUrl(image)}
                    alt={`${project.name} screenshot ${index + 1}`}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="projectImageFallback">Image unavailable</div>
          )}
        </div>
        <div className="projectModalText">
          <div className="projectModalHeader">
            <h2 className="projectModalTitle">{project.name}</h2>
            <p className="projectModalSkills"><i>{project.skills}</i></p>
          </div>
          <div className="projectModalDescriptionWrap">
            <div className="projectModalDescription" ref={descriptionRef} onScroll={updateScrollFade}>
              <h4>Description</h4>
              <p>{project.description}</p>
            </div>
            {showScrollFade && <div className="projectModalScrollFade" aria-hidden="true" />}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProjectModal;
