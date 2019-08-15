var path = require('path');
var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
var Comfortable = require('../dist/comfortable.min');
/** project settings */
var repositoryApiId = process.env.CMFT_REPOSITORY;
var apiKey = process.env.CMFT_APIKEY;
var documentId = process.env.CMFT_DOCUMENT_ID;
var documentAlias = process.env.CMFT_DOCUMENT_ALIAS;
var assetId = process.env.CMFT_ASSET_ID;
var proxyUrl = process.env.CMFT_PROXY_URL;

if (!repositoryApiId || !apiKey || !documentId || !documentAlias || !assetId || !proxyUrl) {
  throw new Error('Environment variables "CMFT_REPOSITORY", "CMFT_APIKEY" "CMFT_DOCUMENT_ID", "CMFT_DOCUMENT_ALIAS", "CMFT_ASSET_ID" and "CMFT_PRDXY_URL" has to be set.');
}


describe('Comfortable', () => {
  var api = Comfortable.api(repositoryApiId, apiKey);



  it('should throw invalid apiKey', function(done) {
    try {
      Comfortable.api(repositoryApiId, '');
      done(new Error('Unexpected behavoir: \'invalid apiKey\' should be thrown as Error'));
    } catch (e) {
      expect(e.message).to.be.equal('invalid apiKey');
      done();
    }
  });

  it('should connect successfully to the api', function(done) {
    var tempApi = Comfortable.api(repositoryApiId, apiKey);
    expect(tempApi).to.be.an.instanceOf(Comfortable.Api)

    tempApi.getRepository()
      .then(response => response.json())
      .then(body => {
        assert.equal(body.meta.apiId, repositoryApiId);
        done();
      })
      .catch((err) => {
        done(err);
      })
  });

  it('should use the proxy endpoint', function(done) {
    var tempApi = Comfortable.api(repositoryApiId, apiKey, {
      useProxy: true,
      proxy: 'http://127.0.0.1:8000/v1'
    });
    expect(tempApi).to.be.an.instanceOf(Comfortable.Api)

    tempApi.getRepository()
      .then(response => response.json())
      .then(body => {
        assert.equal(body.meta.apiId, repositoryApiId);
        done();
      })
      .catch((err) => {
        done(err);
      })
  });

  it('should execute a query', function(done) {
    api.getDocument(documentId)
      .then((response) => {
        expect(response.hasOwnProperty('meta')).to.be.true;
        done();
      })
  });

  it('should retrieve all documents', function(done) {
    api.getDocuments()
      .then((response) => {
        expect(response.data.length > 0).to.be.true;
        done();
      })
  });

  it('should limit the results of all documents', function(done) {
    const limit = 2;
      api.getDocuments({
        limit: limit
      })
      .then((response) => {
        assert.equal(response.meta.count, limit);
        assert.equal(response.meta.limit, limit);
        assert.equal(response.data.length, limit);
        done();
      })
  });

  it('should offset the results of all documents', function(done) {
    const offset = 2;
    api.getDocuments({
      offset: offset
    })
    .then((response) => {
      assert.equal(response.meta.offset, offset);
      done();
    })
  });

  it('should apply a sorting', function(done) {
    api.getDocuments({
      sorting: new Comfortable.Sorting()
        .add('id', 'asc', 'meta')
    })
    .then((response) => {
      expect(response.data[1].meta.id > response.data[0].meta.id).to.be.true;
      done();
    })
  });


  it('should apply a filter', function(done) {
    const testValue = "999999999999999999999999999999";
    api.getDocuments({
      filters: new Comfortable.Filter()
        .addAnd('id', 'greaterThan', testValue, 'meta')
    })
    .then((response) => {
      expect(response.data.length === 0).to.be.true;
      done();
    })
  });

  it('should include by fields', function(done) {
    api.getDocuments({
      includes: new Comfortable.Include()
        .add('relatedNews')
    })
    .then((response) => {
      expect(response).to.have.own.property('includes');
      expect(Object.keys(response.includes).length > 0).to.be.true;
      done();
    })
  });

  it('should include 1 level', function(done) {
    api.getDocuments({
      includes: 1
    })
    .then((response) => {
      expect(response).to.have.own.property('includes');
      expect(Object.keys(response.includes).length > 0).to.be.true;
      done();
    })
  });

  it('should search documents', function(done) {
    const searchPhrase = 'Test';
    api.getDocuments({
      search: searchPhrase
    })
    .then((response) => {
      expect(response.data.length > 0).to.be.true;
      done();
    })
  });

  it('should retrieve documents with all locales', function(done) {
    api.getDocuments({
      locale: 'all'
    })
    .then((response) => {
      expect(response.data.length > 0).to.be.true;
      expect(Object.keys(response.data[0].fields.title).length > 0).to.be.true;
      done();
    })
  });

  it('should retrieve documents by includeTags', function(done) {
    api.getDocuments({
      includeTags: ['include']
    })
    .then((response) => {
      expect(response.data.length > 0).to.be.true;
      expect(response.data[0].meta.tags.indexOf('include') > -1).to.be.true;
      done();
    })
  });

  it('should exclude documents by excludeTags', function(done) {
    api.getDocuments({
      excludeTags: ['exclude']
    })
    .then((response) => {
      expect(response.data.length > 0).to.be.true;
      expect(response.data[0].meta.tags.indexOf('exclude') === -1).to.be.true;
      done();
    })
  });

  it('should retrieve documents with specific fields', function(done) {
    const testValue = 'fields(title)';
    api.getDocuments({
      fields: testValue
    })
    .then((response) => {
      expect(Object.keys(response.data[0].fields).length === 1).to.be.true;
      expect(response.data[0].fields).to.has.own.property('title');
      done();
    })
  });

  it('should retrieve documents of a collection', function(done) {
    api.getCollection('post')
      .then((response) => {
        done();
      })
  });

  it('should retrieve a single document', function(done) {
    api.getDocument(documentId)
      .then((response) => {
        done();
      })
  });

  it('should retrieve a single document with specific fields', function(done) {
    api.getDocument(documentId, {
      fields: 'fields(title)'
    })
      .then((response) => {
        expect(response.fields).to.has.own.property('title');
        done();
      })
  });

  it('should retrieve a single document with embedded assets', function(done) {
    api.getDocument(documentId, {
      embedAssets: true
    })
      .then((response) => {
        expect(response.fields.images[0].fields).to.has.own.property('title');
        done();
      })
  });

  it('should retrieve a single document by alias', function(done) {
    api.getAlias(documentAlias)
      .then((response) => {
        done();
      })
  });

  it('should retrieve a single assets by id', function (done) {
    api.getAsset(assetId)
      .then((response) => {
        done();
      })
  });
})