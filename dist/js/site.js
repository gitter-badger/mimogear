/*

  mimo/drawer

*/


/* ================
// Drawer
// ============= */

function drawer() {

  var drawerTrigger = document.querySelector('.drawer-trigger');

  drawerTrigger.addEventListener('click', activateDrawer, false);

}

function activateDrawer() {

  document.body.classList.toggle('drawer-active');

}

/*

  mimo/harmonica
    http://codepen.io/mimoduo/pen/epZaMq

*/


/* ================
// Harmonica
// ============= */

function harmonica(parameters) {

  var container = document.querySelector(parameters.container);
  var headings = document.querySelectorAll(parameters.header);
  var articles = document.querySelectorAll(parameters.content);

  var currentNote = '';

  for (var i = 0; i < headings.length; i++) {
    headings[i].addEventListener('click', toggleNote, false);
  }

  headings[0].click();

  function clearClasses() {

    for (var i = 0; i < headings.length; i++) {
      headings[i].classList.remove('active');
    }

  }

  function assignClasses(currentNote) {

    currentNote.classList.add('active');

  }

  function toggleNote(event) {

    currentNote = event.currentTarget;

    clearClasses();
    assignClasses(currentNote);

  }

}

/*

  mimo/lantern
    http://codepen.io/mimoduo/pen/EPerjv

*/


/* ================
// Lantern
// ============= */

function lantern(parameters) {

  var lantern = document.querySelector(parameters.container);

  var lanternContent = document.createElement('div');
  lanternContent.classList.add('lantern-content');
  lantern.appendChild(lanternContent);

  var lanternHolder = document.createElement('img');
  lanternHolder.classList.add('lantern-holder');
  lanternContent.appendChild(lanternHolder);

  var lanternPrev = document.createElement('button');
  lanternPrev.classList.add('lantern-control');
  lanternPrev.classList.add('lantern-previous');
  lanternPrev.innerHTML = '<svg class="symbol symbol-prev"><use xlink:href="' + parameters.prevSymbol + '"></use></svg>';
  lanternContent.appendChild(lanternPrev);

  var lanternNext = document.createElement('button');
  lanternNext.classList.add('lantern-control');
  lanternNext.classList.add('lantern-next');
  lanternNext.innerHTML = '<svg class="symbol symbol-next"><use xlink:href="' + parameters.nextSymbol + '"></use></svg>';
  lanternContent.appendChild(lanternNext);

  var lanternClose = document.createElement('button');
  lanternClose.classList.add('lantern-control');
  lanternClose.classList.add('lantern-close');
  lanternClose.innerHTML = '<svg class="symbol symbol-close"><use xlink:href="' + parameters.closeSymbol + '"></use></svg>';
  lanternContent.appendChild(lanternClose);

  var lanternLights = document.querySelectorAll('.lantern-light');

  var lightCollection = [];
  var lightIndex = 0;

  for(var i = 0; i < lanternLights.length; i++) {
    lanternLights[i].addEventListener('click', displayLight, false);

    lightCollection[i] = [];
    lightCollection[i].push(
      lanternLights[i].getAttribute('src'),
      lanternLights[i].getAttribute('title')
    );
  }

  lanternPrev.addEventListener('click', previousLight, false);

  lanternNext.addEventListener('click', nextLight, false);

  lanternClose.addEventListener('click', removeLight, false);

  function previousLight() {

    if(lightIndex == 0) {
      lightIndex = lightCollection.length - 1;
    } else {
      lightIndex--;
    }

    setLight();

  }

  function nextLight() {

    if(lightIndex == lightCollection.length - 1) {
      lightIndex = 0;
    } else {
      lightIndex++;
    }

    setLight();

  }

  function displayLight(light) {

    grabLight(light);
    setLight();

    lantern.classList.add('display-lantern');

  }

  function removeLight() {

    lantern.classList.remove('display-lantern');

  }

  function grabLight(light) {

    for (i = 0; i < lightCollection.length; i++) {

      if (light.target.getAttribute('src') == lightCollection[i][0]) {
        lightIndex = i;
      }

    }

  }

  function setLight() {

    lanternHolder.setAttribute('src', lightCollection[lightIndex][0]);
    lanternHolder.setAttribute('alt', lightCollection[lightIndex][1]);
    lanternHolder.setAttribute('title', lightCollection[lightIndex][1]);

    lanternContent.setAttribute('title', lightCollection[lightIndex][1]);

  }

}

/*

  mimo/swift-slide
    http://codepen.io/mimoduo/pen/gabWmN

*/


/* ================
// Swift Slide
// ============= */

function swift(parameters) {

  var container = document.querySelector(parameters.container);
  var elements = document.querySelectorAll(parameters.container + ' ' + parameters.elements);

  var controller = document.createElement('div');
  controller.classList.add('swift-controls');
  container.appendChild(controller);

  var prev = document.createElement('button');
  prev.addEventListener('click', previousSlide, false);
  prev.innerHTML = '<svg class="symbol symbol-prev"><use xlink:href="' + parameters.prevSymbol + '"></use></svg>';
  controller.appendChild(prev);

  var next = document.createElement('button');
  next.addEventListener('click', nextSlide, false);
  next.innerHTML = '<svg class="symbol symbol-next"><use xlink:href="' + parameters.nextSymbol + '"></use></svg>';
  controller.appendChild(next);

  var currentSlide = 1;

  var pager = document.createElement('div');
  pager.classList.add('swift-pager');
  container.appendChild(pager);

  var pages = [];

  for (var i = 0; i < elements.length; i++) {

    pages.push(document.createElement('span'));

    pager.appendChild(pages[i]);

    pages[i].addEventListener('click', slide.bind(null, i), false);

  }

  pages[currentSlide].click();

  function clearClasses() {

    for (var i = 0; i < elements.length; i++) {
      pages[i].classList.remove('active');
      elements[i].classList.remove('active');
    }

  }

  function assignClasses(index) {

    pages[index].classList.add('active');
    elements[index].classList.add('active');

  }

  function slide(index) {

    clearClasses();
    assignClasses(index);

  }

  function previousSlide() {

    if(currentSlide === 0) {
      currentSlide = elements.length;
    }

    currentSlide = currentSlide - 1;

    slide(currentSlide);

  }

  function nextSlide() {

    if (currentSlide == elements.length - 1) {
      currentSlide = -1;
    }

    currentSlide = currentSlide + 1;

    slide(currentSlide);

  }

}

/*

  site/main

*/


/* ================
// Main Site Function
// ============= */

site();

function site() {

  drawer();

  swift({
    container: '.swift-slide',
    elements: 'li',
    prevSymbol: '#arrow-back',
    nextSymbol: '#arrow-forward'
  });

  harmonica({
    container: '.harmonica',
    header: '.harmonica-header',
    content: '.harmonica-content'
  });

  lantern({
    container: '.lantern',
    prevSymbol: '#arrow-back',
    nextSymbol: '#arrow-forward',
    closeSymbol: '#close'
  });

}
