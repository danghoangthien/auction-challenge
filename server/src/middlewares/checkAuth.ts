const checkAuthMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    // User is authenticated, allow them to proceed to the next middleware or route handler
    next();
  } else {
    // User is not authenticated, redirect to the login page
    res.redirect('/login');
  }
};

export default checkAuthMiddleware;