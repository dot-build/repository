# Repository

A base class to structure the service layer in a resource-based architecture

## A what?

A very common way to structure the application model/service layer, specially with a RESTful architecture, is to have a set of resources. Another common practice is to have services that follow the resources structure to handle data and perform actions.

The repository class is just an interface with 6 methods that allow actions to be taken on a resource:

```
find()
findAll()

save()
saveAll()

remove()
removeAll()
```

The repository provides just an interface to retrieve, modify or remove resources. However, the repository needs an implementation of this interface in order to actually do anything.

That's where an Adapter comes in. Each repository instance must have an adapter with the implementation of the resource actions.

## Usage

To create a new repository, you must give it a configuration. For example, let's create a resource that handles User entities.

```js

var config = {
	name: 'User',
	adapter: RestAdapter,	// any adapter that implements the interface
	options: {
		endpoint: '/users'
	}
};

var UserRepository = Repository.create(config);

```

Now you can create a new User in your app:

```
var user = {
	name: 'John Doe',
	email: 'john@example.com'
};

UserRepository.save(user);
```

## Adapter
Since our config determined that a RestAdapter will be used in this repository, the `save` method will send the `user` object to the adapter and give back whatever it returns.

An adapter method would look like this:

```
// any hypotetical service that handles HTTP requests
import { http } from 'http-service';

class RestAdapter {
	// ...

	// resourceName =	'User'
	// data = 			the user object
	// options = 		the repository configuration
	save(resourceName, data = {}, options = {}) {
		let endpoint = options.endpoint;
		let method = data.id ? 'patch' : 'post';

		return http[method](endpoint, data);
	}
}

```

A single adapter could possibly handle all the repository calls.

## Extending the repository

You can add new methods to all repositories if you need. Just append new methods to `Repository.prototype` and all instances will inherit from it.

To add methods only in one repository, give the config a `methods` property:

```
var config = {
	name: 'User',
	//...
	methods: {
		deactivate: function(id) {
			// the repository instance and its methods are available here
			return this.save({
				id: id,
				active: false
			});
		}
	}
};

var UserRepository = Repository.create(config);
```