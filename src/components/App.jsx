import React from 'react';
import styled from 'styled-components';
import Searchbar from './Searchbar';
import axios from 'axios';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';
import { ThreeDots } from 'react-loader-spinner';
import { useState } from 'react';
import { useEffect } from 'react';
import API from './restAPI';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  font-size: 40px;
  color: #010101;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 20px;
`;

const PP = 12;
const KEY = `31355844-a483d10f60d89145c2ddc6122`;

const App = () => {
  const [collection, setCollection] = useState([]);
  const [loader, setLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState('');

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [currentPage, query]);

  const getData = async () => {
    setLoader(true);
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?page=${currentPage}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${PP}&q=${query}`
      );
      setCollection(prevState => [...prevState, ...response.data.hits]);
    } catch (e) {
      // console.log(e);
    } finally {
      setLoader(false);
    }
  };

  // const onEscPress = boollean => {
  //   this.setState({ modal: boollean });
  // };

  const onSubmit = value => {
    setQuery(value);
    setCurrentPage(1);
    setCollection([]);
    setLoader(true);
  };

  const onClickLoadMore = () => {
    setCurrentPage(prevState => prevState + 1);
  };

  // const openItemInModal = event => {
  //   if (event.target.nodeName === 'IMG') {
  //     const { target } = event;
  //     this.setState({
  //       modal: true,
  //       target,
  //     });
  //   }
  // };

  // const closeModal = event => {
  //   if (event.target.nodeName !== 'IMG') {
  //     this.setState({ modal: false });
  //   }
  // };

  return (
    <Container>
      <Searchbar onSubmitUp={onSubmit} />
      {collection.length > 0 ? (
        <ImageGallery collection={collection} onClick={'openItemInModal'} />
      ) : (
        'Уточните поиск'
      )}

      {/* {this.state.modal && (
        <Modal
          target={this.state.target}
          onClick={this.closeModal}
          onPressKey={this.onEscPress}
        />
      )} */}

      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#4fa94d"
        ariaLabel="three-dots-loading"
        visible={loader}
      />

      {collection.length > 0 ? <Button onClick={onClickLoadMore} /> : null}
    </Container>
  );
};

export default App;
