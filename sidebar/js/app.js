var listItems = document.querySelectorAll('.aside-list-block');
Array.from(listItems).forEach(el => {
    el.addEventListener('click', function() {
        var asideBlock = this.querySelector('.aside-list-subblock');
        var asideIcon = this.querySelector('.right');
        if (asideBlock.style.display != 'block') {
            asideBlock.style.display = 'block';
            asideIcon.style.transform = 'rotate(90deg)';
        } else {
            asideBlock.style.display = 'none';
            asideIcon.style.transform = 'rotate(0deg)';
        }
    }, false);
});
