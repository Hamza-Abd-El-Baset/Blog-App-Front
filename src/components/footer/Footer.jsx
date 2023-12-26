const Footer = () => {
    return (
        <footer style={styles}>
            Copyright 2023 &copy;
        </footer>
    );
}

const styles = {
    color: "var(--white-color)",
    fontSize: "21px",
    backgroundColor: "var(--blue-color)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "50px",
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%"
}
 
export default Footer;