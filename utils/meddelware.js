exports.isloggedin = (req, res, next)=>{
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login")
}

exports.isNotAuthenticated = (req, res, next) => {
    if (!req.session.user) {
      return next(); // User is not authenticated, proceed to the next middleware or route
    }
    res.redirect('/'); // Redirect to home if user is already authenticated
  }