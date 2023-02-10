import React, { useState } from "react";

export default function Search() {
  return (
    <>
      <section className="searchBanner d-flex align-items-center justify-content-center">
        <div className="container">
          <div className="bannerContent text-white mb-5 text-center">
            <h2>Find your next stay</h2>
            <p>Search deals on hotels, homes, and much more...</p>
          </div>
          <div className="searchBox p-4 py-5">
            <form>
              <div className="row align-items-end">
                <div className="col">
                  <div className="form-group">
                    <label className="mb-2 text-white">Location</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Where are you going ..."
                    />
                  </div>
                </div>
                <div className="col">
                  <label className="mb-2 text-white">
                    Check-in - Check-out
                  </label>
                  <div className="input-group">
                    <input type="date" className="form-control" />
                    <input type="date" className="form-control" />
                  </div>
                </div>
                <div className="col">
                  <label className="mb-2 text-white">
                    Adults - Childrens - Rooms
                  </label>
                  <div className="input-group">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Adults"
                    />
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Childrens"
                    />
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Rooms"
                    />
                  </div>
                </div>
                <div className="col-auto">
                  <button type="submit" className="btn bg-brand text-white">
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
