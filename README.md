# Repository

A base class to structure the service layer in a resource-based app architecture

## A what?

The `Repository` class is just an "interface" with common methods that allow actions to be taken on a resource:

```
find()
save()
remove()
```

Calling those methods won't do anything. You need to implement an adapter, which actually performs these actions.
Each repository instance must have an adapter attached to it.

## Usage

To create a new repository, you must give it a configuration.

Use `Repository.new(config)` to extend the default interface.

For example, let's create a resource that handles User entities.

```js

const config = {
    name: 'User',
    adapter: restAdapter,   // any adapter that implements the interface
    options: {
        endpoint: '/users'
    }
};

class UserRepository extends Repository.new(config) {}

export { UserRepository };

```

Now you can create a new User in your app:

```
const user = {
    name: 'John Doe',
    email: 'john@example.com'
};

const repository = new UserRepository();
repository.save(user);

```

## Adapter

Since our config determined that a RestAdapter will be used in the user repository, the `save` method will send the `user` object to the adapter.

The repository name is passed as an argument to the adapter to make it easier to write a single adapter to handle all the requests.

An adapter method would look like this:

```
// any hypotetical service that handles HTTP requests
import { http } from 'http-service';

class RestAdapter {
    // ...

    /**
     * @param {String} repositoryName       Here called "User"
     * @param {*} data                      The object to save, i.e., user object
     * @param {Object} options              Repository configuration
     */
    save(repositoryName, data, options) {
        const endpoint = options.endpoint;

        if (data.id) {
            return http.patch(endpoint, data);
        }

        return http.post(endpoint, data);
    }
}

```

## Extending the repository methods

You can add new methods on a repository if you need. They are just a regular JS class.

```
const config = {
    name: 'User',
    adapter: restAdapter
};

class UserRepository extends Repository.new(config) {

    blockUser: function(id) {
        // the repository instance and its methods are available here
        return this.save({
            id: id,
            active: false
        });
    }

    customAdapterMethod(entity, options) {
        return this.__call__('customMethod', entity, options);
    }
}

```