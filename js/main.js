// Mas del Molí — script principal
(function(){
  "use strict";

  /* Header sólido al hacer scroll */
  var header = document.querySelector('.site-header');
  function onScroll(){
    if(!header) return;
    if(window.scrollY > 40){ header.classList.add('is-solid'); }
    else{ header.classList.remove('is-solid'); }
  }
  document.addEventListener('scroll', onScroll, { passive:true });
  onScroll();

  /* Menú móvil */
  var burger = document.querySelector('.burger');
  var nav = document.querySelector('.nav');
  if(burger && nav){
    burger.addEventListener('click', function(){
      nav.classList.toggle('is-open');
      document.body.classList.toggle('nav-open');
    });
    nav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        nav.classList.remove('is-open');
        document.body.classList.remove('nav-open');
      });
    });
  }

  /* Reveal al hacer scroll */
  var revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && revealEls.length){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('is-visible'); });
  }

  /* Lightbox de galería */
  var galleryLinks = Array.prototype.slice.call(document.querySelectorAll('[data-lightbox]'));
  if(galleryLinks.length){
    var lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.innerHTML =
      '<button class="lightbox__close" aria-label="Cerrar">&times;</button>' +
      '<button class="lightbox__prev" aria-label="Anterior">&#8249;</button>' +
      '<img alt="">' +
      '<button class="lightbox__next" aria-label="Siguiente">&#8250;</button>' +
      '<div class="lightbox__caption"></div>';
    document.body.appendChild(lb);
    var lbImg = lb.querySelector('img');
    var lbCaption = lb.querySelector('.lightbox__caption');
    var current = 0;

    function openLightbox(i){
      current = i;
      var link = galleryLinks[i];
      lbImg.src = link.getAttribute('href');
      lbCaption.textContent = link.getAttribute('data-caption') || '';
      lb.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
    function closeLightbox(){
      lb.classList.remove('is-open');
      document.body.style.overflow = '';
    }
    function step(delta){
      current = (current + delta + galleryLinks.length) % galleryLinks.length;
      openLightbox(current);
    }

    galleryLinks.forEach(function(link, i){
      link.addEventListener('click', function(e){
        e.preventDefault();
        openLightbox(i);
      });
    });
    lb.querySelector('.lightbox__close').addEventListener('click', closeLightbox);
    lb.querySelector('.lightbox__prev').addEventListener('click', function(){ step(-1); });
    lb.querySelector('.lightbox__next').addEventListener('click', function(){ step(1); });
    lb.addEventListener('click', function(e){ if(e.target === lb) closeLightbox(); });
    document.addEventListener('keydown', function(e){
      if(!lb.classList.contains('is-open')) return;
      if(e.key === 'Escape') closeLightbox();
      if(e.key === 'ArrowLeft') step(-1);
      if(e.key === 'ArrowRight') step(1);
    });
  }

  /* Formulario de contacto */
  var contactForm = document.querySelector('.contact-form[data-ajax]');
  if(contactForm){
    contactForm.addEventListener('submit', function(e){
      e.preventDefault();
      var status = contactForm.querySelector('.form-status');
      var btn = contactForm.querySelector('button[type="submit"]');
      var label = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Enviando…';
      status.className = 'form-status';
      status.textContent = '';
      fetch(contactForm.getAttribute('data-ajax'), {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(contactForm)
      }).then(function(res){
        return res.json().catch(function(){ return {}; }).then(function(data){
          if(res.ok && String(data.success) !== 'false'){
            contactForm.reset();
            status.className = 'form-status is-ok';
            status.textContent = 'Mensaje enviado. Te responderemos lo antes posible.';
          } else {
            throw new Error('send failed');
          }
        });
      }).catch(function(){
        status.className = 'form-status is-error';
        status.textContent = 'No hemos podido enviar el mensaje. Escríbenos a masmolireus@gmail.com o por WhatsApp.';
      }).then(function(){
        btn.disabled = false;
        btn.textContent = label;
      });
    });
  }

  /* Filtros de galería */
  var filterButtons = document.querySelectorAll('.filters button');
  var galleryItems = document.querySelectorAll('.gallery-grid figure');
  if(filterButtons.length && galleryItems.length){
    filterButtons.forEach(function(btn){
      btn.addEventListener('click', function(){
        filterButtons.forEach(function(b){ b.classList.remove('is-active'); });
        btn.classList.add('is-active');
        var cat = btn.getAttribute('data-filter');
        galleryItems.forEach(function(fig){
          var match = cat === 'all' || fig.getAttribute('data-cat') === cat;
          fig.style.display = match ? '' : 'none';
        });
      });
    });
  }
})();
