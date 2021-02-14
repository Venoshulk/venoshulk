let obsOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
}

function lazyCall(entries, obs){
    entries.forEach(element => {
        if(element.isIntersecting){
            element.target.src = element.target.dataset.src;
            obs.unobserve(element.target);
        }
    });
}

function main(){
    let observer = new IntersectionObserver(lazyCall, obsOptions);

    document.querySelectorAll('img').forEach(img => {observer.observe(img)});
}

window.onload = main;