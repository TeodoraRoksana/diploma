﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseLayer.Models
{
    public class TypeOfNotes
    {
        [Key]
        public int Id {  get; set; }
        public string Name { get; set; }
    }
}
