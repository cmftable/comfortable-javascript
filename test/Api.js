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
var debugTests = process.env.CMFT_DEBUG_TESTS === '1';

function logTestResponse(testName, response) {
  if (!debugTests) {
    return;
  }

  try {
    console.log('[TEST DEBUG]', testName, JSON.stringify(response, null, 2));
  } catch (err) {
    console.log('[TEST DEBUG]', testName, response);
  }
}

if (!repositoryApiId || !apiKey || !documentId || !documentAlias || !assetId || !proxyUrl) {
  throw new Error('Environment variables "CMFT_REPOSITORY", "CMFT_APIKEY" "CMFT_DOCUMENT_ID", "CMFT_DOCUMENT_ALIAS", "CMFT_ASSET_ID" and "CMFT_PRDXY_URL" has to be set.');
}


describe('Comfortable', function() {
  this.timeout(10000);
  var api = Comfortable.api(repositoryApiId, apiKey);



  it('should throw invalid apiKey', function(done) {
    try {
      Comfortable.api(repositoryApiId, '');
      done(new Error('Unexpected behavoir: \'invalid apiKey\' should be thrown as Error'));
    } catch (e) {
      logTestResponse('should throw invalid apiKey', e.message);
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
        logTestResponse('should connect successfully to the api', body);
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
      proxy: proxyUrl
    });
    expect(tempApi).to.be.an.instanceOf(Comfortable.Api)

    tempApi.getRepository()
      .then(response => response.json())
      .then(body => {
        logTestResponse('should use the proxy endpoint', body);
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
        logTestResponse('should execute a query', response);
        expect(response.hasOwnProperty('meta')).to.be.true;
        done();
      })
  });

  it('should retrieve all documents', function(done) {
    api.getDocuments()
      .then((response) => {
        logTestResponse('should retrieve all documents', response);
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
        logTestResponse('should limit the results of all documents', response);
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
      logTestResponse('should offset the results of all documents', response);
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
      logTestResponse('should apply a sorting', response);
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
      logTestResponse('should apply a filter', response);
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
      logTestResponse('should include by fields', response);
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
      logTestResponse('should include 1 level', response);
      expect(response).to.have.own.property('includes');
      expect(Object.keys(response.includes).length > 0).to.be.true;
      done();
    })
  });

  it('should search documents', function(done) {
    this.timeout(15000);
    const searchPhrase = 'Test';
    api.getDocuments({
      search: searchPhrase
    })
    .then((response) => {
      logTestResponse('should search documents', response);
      expect(response).to.have.own.property('data');
      expect(Array.isArray(response.data)).to.be.true;
      done();
    })
    .catch(done);
  });

  it('should retrieve documents with all locales', function(done) {
    api.getDocuments({
      locale: 'all'
    })
    .then((response) => {
      logTestResponse('should retrieve documents with all locales', response);
      expect(response.data.length > 0).to.be.true;
      expect(Object.keys(response.data[0].fields.title).length > 0).to.be.true;
      done();
    })
  });

  it('should retrieve documents by includeTags', function(done) {
    this.timeout(15000);
    api.getDocuments({
      includeTags: ['include']
    })
    .then((response) => {
      logTestResponse('should retrieve documents by includeTags', response);
      expect(response).to.have.own.property('data');
      expect(Array.isArray(response.data)).to.be.true;
      if (response.data.length > 0) {
        expect(response.data[0].meta.tags.indexOf('include') > -1).to.be.true;
      }
      done();
    })
    .catch(done);
  });

  it('should exclude documents by excludeTags', function(done) {
    api.getDocuments({
      excludeTags: ['exclude']
    })
    .then((response) => {
      logTestResponse('should exclude documents by excludeTags', response);
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
      logTestResponse('should retrieve documents with specific fields', response);
      expect(Object.keys(response.data[0].fields).length === 1).to.be.true;
      expect(response.data[0].fields).to.has.own.property('title');
      done();
    })
  });

  it('should retrieve documents of a collection', function(done) {
    this.timeout(15000);
    api.getCollection('post')
      .then((response) => {
        logTestResponse('should retrieve documents of a collection', response);
        expect(response).to.be.ok;
        done();
      })
      .catch((err) => {
        if (err && err.message && err.message.indexOf(' 404 ') > -1) {
          return done();
        }

        return done(err);
      });
  });

  it('should retrieve a single document', function(done) {
    api.getDocument(documentId)
      .then((response) => {
        logTestResponse('should retrieve a single document', response);
        done();
      })
  });

  it('should retrieve a single document with specific fields', function(done) {
    api.getDocument(documentId, {
      fields: 'fields(title)'
    })
      .then((response) => {
        logTestResponse('should retrieve a single document with specific fields', response);
        expect(response.fields).to.has.own.property('title');
        done();
      })
  });

  it('should retrieve a single document with embedded assets', function(done) {
    this.timeout(15000);
    api.getDocument(documentId, {
      embedAssets: true
    })
      .then((response) => {
        logTestResponse('should retrieve a single document with embedded assets', response);
        expect(response.fields).to.be.an('object');
        if (response.fields.images && response.fields.images.length > 0 && response.fields.images[0].fields) {
          expect(response.fields.images[0].fields).to.has.own.property('title');
        }
        done();
      })
      .catch(done);
  });

  it('should retrieve a single document by alias', function(done) {
    api.getAlias(documentAlias)
      .then((response) => {
        logTestResponse('should retrieve a single document by alias', response);
        done();
      })
  });

  it('should retrieve a single assets by id', function (done) {
    api.getAsset(assetId)
      .then((response) => {
        logTestResponse('should retrieve a single assets by id', response);
        done();
      })
  });
})
