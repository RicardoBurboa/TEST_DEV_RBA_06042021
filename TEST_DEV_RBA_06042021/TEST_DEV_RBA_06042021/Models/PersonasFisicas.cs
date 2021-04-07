using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TEST_DEV_RBA_06042021.Models
{
    public class PersonasFisicas
    {
        [Key]
        public int IdPersonaFisica { get; set; }

        public DateTime FechaRegistro { get; set; }

        public DateTime FechaActualizacion { get; set; }

        public string Nombre { get; set; }

        public string ApellidoPaterno { get; set; }

        public string ApellidoMaterno { get; set; }

        public string RFC { get; set; }

        public DateTime FechaNacimiento { get; set; }

        public int UsuarioAgrega { get; set; }

        public Boolean Activo { get; set; }
    }
}
