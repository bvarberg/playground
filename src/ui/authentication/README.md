The authentication provider service is not exposed with the ServiceLocator
because there is React state that must be connected to its actions. Also,
because I want its functionality to be more tightly controlled, so it _must_ be
used through the code that integrates it with the application state.

For these reasons, it is wrapped immediately with the authentication
module - and React-aware, wrapped functions are provided down the tree
via a specific context.
