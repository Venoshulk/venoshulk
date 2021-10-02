const imgOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
}
const obsOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
}

function lazyCall(entries, obs){
    entries.forEach(element => {
        if(element.isIntersecting){
            element.target.src = element.target.dataset.src;
            obs.unobserve(element.target);
        }
    });
}

function revealSection(entries, obs){
    entries.forEach(element => {
        if(element.isIntersecting){
            element.target.style.visibility = 'visible';
            element.target.style.opacity = 1;
            obs.unobserve(element.target);
        }
    });
}

export const startLazy =  function(){
    let sectionObserver = new IntersectionObserver(revealSection, obsOptions);
    let imgObserver = new IntersectionObserver(lazyCall, imgOptions);

    document.querySelectorAll('img').forEach(img => {imgObserver.observe(img)});
    document.querySelectorAll('article').forEach(article => {sectionObserver.observe(article)});
}