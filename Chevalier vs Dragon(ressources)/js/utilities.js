'use strict';   // Mode strict du JavaScript

/*************************************************************************************************/
/* *********************************** FONCTIONS UTILITAIRES *********************************** */
/*************************************************************************************************/

function GetLavel(message,min,max)
{   var choix;
	do 
	{
		choix = parseInt(window.prompt(message));
	}
	while (((choix < min) || (choix > max) || (isNaN(choix)) ))
	return parseInt(choix);
}

function GetDes(min,max)
{   var D
	
	 D=Math.floor(Math.random() * (max - min + 1)) + min;

	 return(D);
	 
}
