﻿using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace Server.Models
{
    public class FilterNames
    {
        [Key]
        public int Id { get; set; }
        public int UsersId { get; set; }
        public string Name { get; set; }
        public string Color { get; set; }//Hex or rgb?
        
    }
}
