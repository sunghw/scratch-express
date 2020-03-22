const router = require('express').Router();
const Joi = require('joi');
router.get('/', (req, res) => {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!'
    });
});

const courses = [
    { id: 1, name: 'course 1'},
    { id: 2, name: 'course 2'},
    { id: 3, name: 'course 3'},
]
const validateCourse = (course) => {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}

router.get('/courses', (req, res) => {
    // list of courses from the data base but lets do that later
    res.send(courses);
});

//route with a parameter, or query params
router.get('/courses/:id', (req, res) => {
    // res.send(req.params.id);
    // res.send(req.query);
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send(`The course ${req.params.id} not found`);
    res.send(course);
});

router.post('/courses', (req, res) => {
    // get the courses from body of the request
    // validator package.. use npm joi! 
    const { error } = validateCourse(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    const course = {
        id: courses.length + 1, // wil lbe assigned by db later
        name: req.body.name  // assuming body has object with name property.
    }
    courses.push(course);
    res.send(course);   // we are letting the client know this generated id.
});

/* update course */
router.put('/courses/:id', (req, res) => {
    // Look up the course. if not exists, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send(`The course ${req.params.id} not found`);

    // validate that body has name. if invalid 400 bad request.
    const { error } = validateCourse(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // update course 
    course.name = req.body.name;

    // return the updated course
    res.send(course);
})

/* delete course */
router.delete('/courses/:id', (req, res) => {
    // Look up the course. if not exists, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send(`The course ${req.params.id} not found`);

    const index = courses.indexOf(course);
    courses.splice(index,1);
    
    // return the updated course
    res.send(course);
    
})

module.exports = router;