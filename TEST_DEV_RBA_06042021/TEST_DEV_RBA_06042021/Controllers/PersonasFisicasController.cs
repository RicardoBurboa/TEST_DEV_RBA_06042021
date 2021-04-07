using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TEST_DEV_RBA_06042021.Context;
using TEST_DEV_RBA_06042021.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TEST_DEV_RBA_06042021.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonasFisicasController : ControllerBase
    {

        private readonly AppDbContext context;
        public PersonasFisicasController(AppDbContext context)
        {
            this.context = context;
        }

        // GET: api/<PersonasFisicasController>
        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                return Ok(context.Tb_PersonasFisicas.ToList());
            } catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET api/<PersonasFisicasController>/5
        [HttpGet("{id}", Name = "GetPersonaFisica")]
        public ActionResult Get(int id)
        {
            try
            {
                var PersonaFisica = context.Tb_PersonasFisicas.FirstOrDefault(g => g.IdPersonaFisica == id);
                return Ok(PersonaFisica);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST api/<PersonasFisicasController>
        [HttpPost]
        public ActionResult Post([FromBody] PersonasFisicas PersonaFisica)
        {
            try
            {
                context.Tb_PersonasFisicas.Add(PersonaFisica);
                context.SaveChanges();
                return CreatedAtRoute("GetPersonaFisica", new { id = PersonaFisica.IdPersonaFisica }, PersonaFisica);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<PersonasFisicasController>/5
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] PersonasFisicas PersonaFisica)
        {
            try
            {
                if (PersonaFisica.IdPersonaFisica == id)
                {
                    context.Entry(PersonaFisica).State = EntityState.Modified;
                    context.SaveChanges();
                    return CreatedAtRoute("GetPersonaFisica", new { id = PersonaFisica.IdPersonaFisica }, PersonaFisica);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE api/<PersonasFisicasController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                var PersonaFisica = context.Tb_PersonasFisicas.FirstOrDefault(g => g.IdPersonaFisica == id);
                if (PersonaFisica != null)
                {
                    context.Tb_PersonasFisicas.Remove(PersonaFisica);
                    context.SaveChanges();
                    return Ok(id);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
