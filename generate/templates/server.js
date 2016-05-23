/* 
 * {{lowercasePlural}} information
 */
app
  .get('/{{lowercasePlural}}', fauxhal.{{lowercasePlural}}.get)
  .post('/{{lowercase}}', fauxhal.{{lowercasePlural}}.new)
  .get('/{{lowercase}}/:nummer', fauxhal.{{lowercasePlural}}.{{lowercase}})
  .put('/{{lowercase}}/:nummer', fauxhal.{{lowercasePlural}}.update)
  .delete('/{{lowercase}}/:nummer', fauxhal.{{lowercasePlural}}.delete);
