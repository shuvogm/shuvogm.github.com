<?php
require ("ClassMathGuard.php");
if($_POST)
{
$javascript_enabled = trim($_POST['browser_check']);
$department = trim($_POST['dept']);
$name = trim($_POST['name']);
$email = trim($_POST['email']);
$phno = trim($_POST['phno']);
$subject = trim($_POST['subject']);
$msg = trim($_POST['msg']);
$selfcopy = trim($_POST['selfcopy']);


//mail settings
$sales_address = "shuvogm@gmail.com";
$support_address = "shuvogm@gmail.com";
$billing_address = "shuvogm@gmail.com";
$headers = "From: ".$email;
$message = "Contact name: $name\nContact Email: $email\nContact Phone: $phno\n\nMessage: $msg";

if (MathGuard :: checkResult($_POST['mathguard_answer'], $_POST['mathguard_code'])) { 

	if ( $department == "sales") $to = $sales_address;
	elseif ( $department == "support") $to = $support_address;
	elseif ( $department == "billing") $to = $billing_address;

	if ( $name == "" )
	{
		$result = "Name field is required";
	}
	elseif (!preg_match("/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/", $email)) 
	{
		$result = "Enter a valid email address";
	}
	elseif(!preg_match("/^[0-9]{2}-[0-9]{10}$/", $phno)) //check for a pattern of 91-0123456789
	{
		$result = "Enter a valid phone number";
	}
	elseif ( $subject == "" )
	{
		$result = "Subject is required";
	}
	elseif ( strlen($msg) < 10 )
	{
		$result = "Write more than 10 characters";
	}
	else
	{	
		
			mail($to, $subject, $message, $headers);
		if( $selfcopy == "yes" )
			mail($email, $subject, $message, $headers);
		$result = "Your mail has been sent succesfully!";
		
	}
}
else $result = "Bad Answer, Please try again!";
	
	if($javascript_enabled == "true") {
		echo $result;
		die();
	}

}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<title>Contact Form</title>
<style>
body { 
	background:#323032;
}

#contactform { 
	width:400px; 
	margin:50px auto; 
	background:#fff; 
	padding:20px; 
	-moz-border-radius:15px; 
	-webkit-border-radius:15px; 
	border-radius:15px; 
}

.form { 
	text-align:left; 
	font-size:18px; 
	font-weight:normal; 
	font-family:"Times New Roman", Times, serif; 
	color:#666;
}

h1 { 
	font-family: "Century Gothic", "Times New Roman", Times, serif; 
	font-size:28px; 
	color: #333; 
	margin-bottom:10px; 
}

h1 span {
	color: #00CC33; 
}

input.text,textarea.text, select.text { 
	width:300px; 
	border:1px solid #CCCCCC; 
	padding:5px; 
	margin-bottom:10px; 
	background: url(images/input-bg.gif) top left no-repeat; 
}

#result { 
	color:#FF0000;
	font-style: italic;
	margin-bottom: 5px
}

.message {
	background: #33FF99;
	padding: 5px 3px;
}

img.loading-img {
	padding: 5px 3px;
}

textarea.text { 
	height:100px;
}

input#submit { 
	padding: 5px 10px; 
	background: #f2f2f2; 
	border:1px solid #e5e5e5; 
	font-family: Georgia, "Times New Roman", Times, serif; 
	font-style: italic; 
	font-size: 18px; 
	color: #000; 
	-moz-border-radius:15px; 
	-webkit-border-radius:15px; 
	border-radius:15px; 
}
</style>
<script src="http://code.jquery.com/jquery-1.4.4.js"></script>
</head>

<body>
<div id="contactform">
<h1>Contact <span>Form</span></h1>
<form name="contactform" id="form" method="post" action="contact.php">
<div id="result"><?php if($result) echo "<div class='message'>".$result."</div>"; ?></div>
<label>Department</label><br />
<select name="dept" class="text">
	<option value="sales">Sales</option>
	<option value="support">Support</option>
	<option value="billing">Billing</option>
</select><br />
<label class="name">Name<br /><input class="text" name="name" type="text" value="<?php echo $name; ?>" /><br /></label>
<label class="email">Email<br /><input class="text" name="email" type="text" value="<?php echo $email; ?>" /><br /></label>
<label class="phno">Telephone no<br /><input class="text" name="phno" type="text" value="<?php echo $phno; ?>" /><br /></label>
<label class="subject">Subject<br /><input class="text" name="subject" type="text" value="<?php echo $subject; ?>" /><br /></label>
<label class="msg">Message<br /><textarea class="text" name="msg"><?php echo $msg; ?></textarea><br /></label>
<input type="checkbox" name="selfcopy" <?php if($selfcopy == "yes") echo "checked='checked'"; ?> value="yes" /><label>Send a copy to yourself?</label><br /><br />
<?php MathGuard::insertQuestion(); ?>
<input type="hidden" name="browser_check" value="false" />
<input type="submit" name="submit" value="Submit" id="submit" />

</form>

<script type="text/javascript">

	document.contactform.browser_check.value = "true"; //sets the hidden input(browser_check) value as true if the javascript is enabled.
		
	 $("#submit").click(function(){
	 
		$('#result').html('<img src="http://www.tutorialstag.com/examples/images/loader.gif" class="loading-img" alt="loader image">').fadeIn();
		var input_data = $('#form').serialize();
				$.ajax({
				   type: "POST",
				   url:  "<?php echo "http://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']; ?>",
				   data: input_data,
				   success: function(msg){
					   $('.loading-img').remove(); //Removing the loader image because the validation is finished
					   $('<div class="message">').html(msg).appendTo('div#result').hide().fadeIn('slow'); //Appending the output of the php validation in the html div
				   }					   
				});	
				
			return false;
			
	  });	

	</script>
</div>
</body>
</html>