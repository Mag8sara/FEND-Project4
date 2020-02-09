$(function() {
    //starting a test suite named "RSS Feeds"
    describe('RSS Feeds', function() {
        //testing that allfeeds has been defined.
        it('All are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        //Make sure that all the feeds has urls
        it('All has urls', function() {
            for (let x of allFeeds) {
                expect(x.url).toBeDefined();
                expect(x.url.length).not.toBe(0);
            }
        });

        //Make sure that all the feeds has names
        it('All has names', function() {
            for (let x of allFeeds) {
                expect(x.name).toBeDefined();
                expect(x.name.length).not.toBe(0);
            }
        });
    });

    //starting another test suite named "the menu"
    describe('The menu', function() {
        //to hold body and links class
        let TheBody = document.body;
        let Link = $('.menu-icon-link');

        //Testing that the menu is hidden by defualt.
        it('The menu is hidden', function() {
            expect(TheBody.className).toContain('menu-hidden');
        });

        //Testing that menu appears when click and disappears
        it('Menu working in Click', function() {
            Link.trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            Link.trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    //starting another test suite named "Initial Entries".
    describe('Initial Entries', function() {
        //Function for doing the asynchronous request.
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });
        it('Feed should has at least a one entry', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });
    //starting another test suite named "New Feed Selection".
    describe('New Feed Selection', function() {
        //variables for compare.
        let feedone;
        let feedtwo;
        //For holding the feed.
        let thefeed = $('.feed');

        //whenever the feed is loaded save innerHTML.
        beforeEach(function(done) {
            loadFeed(0, function() {
                feedone = thefeed.html();
                loadFeed(1, function() {
                    feedtwo = thefeed.html();
                    done();
                });
            });
        });

        //comparing the two feeds 
        it('Checking the difference', function() {
            expect(feedone).not.toEqual(feedtwo);
        });
    });
}());
