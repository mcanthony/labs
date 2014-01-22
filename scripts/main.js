App = function() {
	this.currentExperimentName = '';

	this.experimentEl = document.getElementsByClassName('experiment')[0];
	this.headerEl = document.getElementsByTagName('header')[0];
	this.navEl = document.getElementsByTagName('nav')[0];

	var experimentsThumbnailsEl = this.navEl.getElementsByTagName('a');
	for (var i = 0; i < experimentsThumbnailsEl.length; i++) {
		experimentsThumbnailsEl[i].addEventListener('click', this.onExperimentClick.bind(this));
	}
	this.headerEl.addEventListener('click', this.onHeaderClick.bind(this));
	this.navEl.addEventListener('scroll', this.onScroll.bind(this));
	window.addEventListener('hashchange', this.onHashChange.bind(this));
	this.onHashChange();
};

App.prototype.displayExperiment = function(name) {
	this.experimentEl.innerHTML = "";
	if(name) {
		var iframe = document.createElement('iframe');
		iframe.src = 'experiments/' + name;
		iframe.classList.add('hide');
		this.experimentEl.appendChild(iframe);
		setTimeout(function() {
			iframe.classList.remove('hide');
		}, 1000);
		this.navEl.classList.add('hide');
		this.headerEl.classList.add('shrink');
	}
	else {
		this.navEl.classList.remove('hide');
		this.headerEl.classList.remove('shrink');
		this.onScroll();
	}
};

App.prototype.onExperimentClick = function(e) {
	e.preventDefault();
	window.location.hash = '/' + e.currentTarget.getAttribute('href').split('experiments/')[1];
};

App.prototype.onHeaderClick = function() {
	window.location.hash = '/';
};

App.prototype.onHashChange = function(e) {
	var splittedHash = window.location.hash.split('/');
	var name = (splittedHash.length === 3) ? splittedHash[2] : splittedHash[1];
	this.displayExperiment(name);
};

App.prototype.onScroll = function(e) {
	if(this.navEl.scrollTop > 0) {
		this.headerEl.classList.add('shrink');
		this.navEl.classList.add('to-top');
	}
	else {
		this.headerEl.classList.remove('shrink');
		this.navEl.classList.remove('to-top');
	}
};

app = new App();