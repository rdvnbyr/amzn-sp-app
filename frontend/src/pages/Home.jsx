import {FormControl, Button} from 'react-bootstrap';

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <div className="d-grid gap-4" style={{maxWidth: '42rem'}}>
        <div className="card">
          <div className="card-body">
            <div className="d-flex flex-column gap-2 mb-4">
              <label>Search by Asin</label>
              <form className="d-flex flex-row gap-2">
                <FormControl type="text" placeholder="ASIN" />
                <Button variant="primary">Submit</Button>
              </form>
            </div>
            <div className="d-flex flex-column gap-2 mb-4">
              <label>Product-type</label>
              <form className="d-flex flex-row gap-2">
                <FormControl type="text" placeholder="ASIN" />
                <Button variant="primary">Submit</Button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
