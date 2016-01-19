/* globals Repository, MockAdapter, MockResponse */
describe('Repository', function() {
    'use strict';
    var config, options, mergedOptions, Repo, RepoConstructor;

    function createRepository() {
        config = {
            name: 'Repo',
            adapter: MockAdapter,
            options: {
                endpoint: '/foo'
            }
        };

        options = {
            foo: 'bar'
        };

        mergedOptions = {
            endpoint: '/foo',
            foo: 'bar'
        };

        RepoConstructor = Repository.new(config);
        Repo = new RepoConstructor();
    }

    describe('::new(config)', function() {
        it('should create a new repository constructor', function() {
            createRepository();
            expect(typeof RepoConstructor).toBe('function');
            expect(Repo instanceof Repository).toBe(true);
        });

        it('should throw an error if the repository name is invalid', function() {
            function test() {
                Repository.new({
                    name: '',
                    adapter: MockAdapter,
                    options: {}
                });
            }

            expect(test).toThrow(new Error('Invalid repository name'));
        });

        it('should throw an error if the repository adapter is invalid', function() {
            function test() {
                Repository.new({
                    name: 'RepoTest',
                    adapter: null,
                    options: {}
                });
            }

            expect(test).toThrow(new Error('Invalid repository adapter'));
        });
    });

    describe('#save(entity, options)', function() {
        it('should call the adapter implementation of save()', function() {
            createRepository();
            var entity = {
                name: 'foo'
            };
            var result = Repo.save(entity, options);

            expect(MockAdapter.save).toHaveBeenCalledWith(config.name, entity, mergedOptions);
            expect(result).toBe(MockResponse);
        });
    });

    describe('#remove(entity, options)', function() {
        it('should call the adapter implementation of remove()', function() {
            createRepository();
            var entity = {
                name: 'foo'
            };
            var result = Repo.remove(entity, options);

            expect(MockAdapter.remove).toHaveBeenCalledWith(config.name, entity, mergedOptions);
            expect(result).toBe(MockResponse);
        });
    });

    describe('#find(entity, options)', function() {
        it('should call the adapter implementation of find()', function() {
            createRepository();
            var entity = {
                name: 'foo'
            };
            var result = Repo.find(entity, options);

            expect(MockAdapter.find).toHaveBeenCalledWith(config.name, entity, mergedOptions);
            expect(result).toBe(MockResponse);
        });
    });
});
