<HTML>
<HEAD>
 <TITLE>GALLERY</TITLE>
 <LINK REL="stylesheet" TYPE="text/css" HREF="css/style.css">
 <LINK HREF="https://fonts.googleapis.com/css?family=Ubuntu:400,500,700,400italic,500italic,700italic,300,300italic" REL="stylesheet" TYPE="text/css">
 <SCRIPT TYPE="text/javascript" SRC="js/jquery-2.2.0.js"></SCRIPT>
 <SCRIPT TYPE="text/javascript" SRC="js/jquery-ui.min.js"></SCRIPT>
 <SCRIPT TYPE="text/javascript" SRC="js/jPages.min.js"></SCRIPT>
 <SCRIPT TYPE="text/javascript" SRC="js/ajax_fetch.js"></SCRIPT>
 <SCRIPT TYPE="text/javascript" SRC="js/top_menu.js"></SCRIPT>
</HEAD> 
<BODY>


<DIV CLASS="container">
	<DIV CLASS="header">
 		<DIV CLASS="title"><A HREF="index.php">GALLERY 35MM</A></DIV>
 		<DIV CLASS="links_other">
 			<A CLASS="menu_other" HREF="projects">OTHER PROJECTS</A>
 			<A CLASS="menu_other" HREF="profile">PROFILE</A>
 		</DIV>
		<DIV CLASS="links"></DIV>
	</DIV>

	<DIV CLASS="cover"></DIV>
	
	
	<DIV CLASS="content" ID="content"></DIV>
	<DIV CLASS="popup_image">
		<P CLASS='popup_close'>X</P>
		<P CLASS='popup_next'> &raquo;</P>
		<P CLASS='popup_prev'>&laquo; </P>
		<DIV CLASS="popup_content"></DIV>
	</DIV>

	<DIV CLASS="left_content">
		<DIV CLASS="sublinks"></DIV>
	</DIV>
	
	<DIV CLASS="right_content">
		<DIV CLASS="tagwall"></DIV>
	</DIV>
	
</DIV>


<DIV CLASS="bottom_bar">
	<DIV CLASS="holder"></DIV>
</DIV>

<SCRIPT>
	createGallery("photos", "");
	tagWall();
</SCRIPT>

</BODY>
</HTML>