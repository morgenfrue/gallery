<HTML>
<HEAD>
  <TITLE>Gallery backend</TITLE>
  <META http-equiv="Content-Type" content="text/html; charset=utf-8">
  <LINK REL="stylesheet" TYPE="text/css" HREF="css/style.css">
  <SCRIPT TYPE="text/javascript" SRC="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></SCRIPT>
  <SCRIPT TYPE="text/javascript" SRC="js/jquery.form.min.js"></SCRIPT>
  <SCRIPT TYPE="text/javascript" SRC="js/upload.js"></SCRIPT>
</HEAD>
<BODY>
<DIV CLASS="container">

  <FORM ACTION="uploader.php" METHOD="post" ID="uploader" ENCTYPE="multipart/form-data">
    <LABEL ID="uploader_label">Select image:</LABEL> <INPUT TYPE="file" NAME="image_uploader" ID="image_uploader">
    <LABEL ID="title_label">Photo title:</LABEL> <INPUT TYPE="text" NAME="image_title" ID="image_title">
    <LABEL ID="date_label">Photo date:</LABEL> <INPUT TYPE="text" NAME="image_date" ID="image_date">
    <LABEL ID="location_label">Location:</LABEL> 
      <SELECT NAME="image_location" ID="image_location">
      <OPTION>test</OPTION>
      </SELECT>
    <LABEL ID="gear_label">Equipment:</LABEL> 
      <SELECT NAME="image_gear" ID="image_gear">
      <OPTION>test</OPTION>
      </SELECT>
    <LABEL ID="description_label">Description:</LABEL> 
      <TEXTAREA></TEXTAREA>
    <DIV CLASS="submitter">
      <INPUT TYPE="submit" VALUE="Upload" CLASS="submit_button">
    </DIV>
  </FORM>

  <DIV ID="image_previewer">
    <IMG SRC="img/no-thumb.png" ID="image_preview" />
  </DIV>

 
</DIV>
</BODY>
</HTML>