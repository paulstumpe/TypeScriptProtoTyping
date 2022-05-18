/**
 * For some games I want to show coordinates to the player, and those will probably not be cube,
 * but instead axial or offset, so I’ll need a data structure for the player-visible
 * coordinate system, as well as functions for converting back and forth. Cube and axial are
 * basically the same so I’m not going to bother implementing a separate axial system,
 * and I’ll reuse Hex.  For offset coordinates,
 * I’ll make a separate data structure Offset.
 */

/**
 * REMINDER:
 * These two classes are effectively equivalent. The first one stores s explicitly and the
 * second one uses accessors and calculates s when needed. Cube and Axial are
 * essentially the same system, so I’m not going to write a separate class for each.
 * However the labels on this page are different. On the main page, the axial/cube
 * relationship is q→x, r→z, but here I am making q→q, r→r. And that means on the main
 * page cube coordinates are (q, -q-r, r) but on this page cube coordinates are (q, r, -q-r).
 * This makes my two pages inconsistent and I plan to update the main page to match this page.
 */


// struct Hex { // Cube storage, cube constructor
//     const int q, r, s;
//     Hex(int q_, int r_, int s_): q(q_), r(r_), s(s_) {
//         assert (q + r + s == 0);
//     }
// };

/**
 * assert (q + r + s == 0);
 */
export interface HexStruct {
  q: number,
  r: number,
  s: number,
}


// struct Hex { // Axial storage, cube constructor
//     const int q_, r_;
//     Hex(int q, int r, int s): q_(q), r_(r) {
//         assert (q + r + s == 0);
//     }
//
//     inline int q() { return q_; }
//     inline int r() { return r_; }
//     inline int s() { return - q_ - r_; }
// };
/**
 * S derived from q and r.
 * S = -q - r
 */
export interface AxialHexStruct {
  q: number,
  r: number
}

