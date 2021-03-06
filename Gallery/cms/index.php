<HTML>
<HEAD>
  <TITLE>Gallery backend</TITLE>
  <LINK REL="stylesheet" TYPE="text/css" HREF="css/style.css">
  <LINK HREF="https://fonts.googleapis.com/css?family=Ubuntu:400,500,700,400italic,500italic,700italic,300,300italic" REL="stylesheet" TYPE="text/css">
  <SCRIPT TYPE="text/javascript" SRC="js/jquery-2.2.0.js"></SCRIPT>
  <SCRIPT TYPE="text/javascript" SRC="js/jquery-ui.min.js"></SCRIPT>
  <SCRIPT TYPE="text/javascript" SRC="js/jquery.form.min.js"></SCRIPT>
  <SCRIPT TYPE="text/javascript" SRC="js/upload.js"></SCRIPT>
  <SCRIPT TYPE="text/javascript" SRC="js/archive.js"></SCRIPT>
</HEAD>
<BODY>

<DIV CLASS="container">
<DIV ID="header">
    Gallery CMS
</DIV>

<DIV ID="collection_container">
  <DIV ID="collection_menu">
    <SELECT ID="collection"></SELECT>
  </DIV>
</DIV>


<DIV ID="upload_container">
  <DIV ID="title_upload">ADD PHOTO</DIV>

  <DIV ID="image_previewer">
    <IMG SRC="img/no-thumb.png" ID="image_preview" />
  </DIV>


  <FORM ACTION="uploader.php" METHOD="post" ID="uploader" ENCTYPE="multipart/form-data">
    <DIV CLASS="form_div image_uploader">
      <LABEL ID="uploader_label">Select image</LABEL> 
      <INPUT TYPE="file" NAME="image_uploader" ID="image_uploader"></INPUT>
    </DIV>
    <DIV CLASS="form_div">
      <LABEL ID="title_label">Photo title</LABEL> 
      <INPUT TYPE="text" NAME="image_title" ID="image_title"></INPUT>
    </DIV>
    <DIV CLASS="form_div">
      <LABEL ID="date_label">Photo date</LABEL> 
      <INPUT TYPE="text" NAME="image_date" ID="image_date"></INPUT>
    </DIV>
    <DIV CLASS="form_div">
      <LABEL ID="location_label">Location</LABEL> 
      <SELECT NAME="image_category" ID="image_category"></SELECT>
    </DIV>
    <DIV CLASS="form_div">
      <LABEL ID="gear_label">Equipment</LABEL> 
      <SELECT NAME="image_gear" ID="image_gear"></SELECT>
    </DIV>
    <DIV CLASS="form_div description_div">
      <LABEL ID="description_label">Description</LABEL> 
      <TEXTAREA NAME="image_description" ID="image_description"></TEXTAREA>
    </DIV>
    
    <DIV ID="tag_box"></DIV>
    
	<DIV CLASS="form_div tags_div">
	  <LABEL ID="tags_label">Select tag</LABEL>
	  <P ID="select_tag">&raquo;</P>
	  <SELECT NAME="image_tags" ID="image_tags"></SELECT>
	</DIV>
	
	<DIV CLASS="form_div add_tag_field">
	  <LABEL ID="add_tag_label">Add new tag</LABEL>
	  <P ID="add_tag">+</P>
	  <INPUT TYPE="text" NAME="image_add_tag" ID="image_add_tag"></INPUT>
	</DIV>
     
    
    <DIV CLASS="form_div submit">
      <INPUT TYPE="submit" VALUE="UPLOAD" CLASS="submit_button"></INPUT>
    </DIV>
  </FORM>
</DIV>

 
</DIV>
</BODY>
</HTML>