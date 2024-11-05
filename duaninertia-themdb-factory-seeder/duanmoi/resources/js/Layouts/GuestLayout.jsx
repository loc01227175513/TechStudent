
// Renamed the second import to avoid conflict
import Header from '@/Header/Header';
import Footer from '@/Footer/Footer';
export default function Guest({ children }) {
    return (
        <>
            <Header />
         
                {children}
         
            <Footer />
        </>
    );
}